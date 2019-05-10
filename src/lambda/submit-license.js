import _ from 'lodash'
import semver from 'semver'
import axios from 'axios'
import updateLicense from './convert'
// import test from './test.json'

export async function handler (event, context) {
  try {
    let input = JSON.parse(event.body)
    let data = await checkInput(input)
    let { dependencies } = data

    // No dependencies
    if (!dependencies) {
      return {
        statusCode: 400,
        body: "I can't seem to find any dependencies"
      }
    }

    // scoped packages error
    // version not found error - just grab repository details and then get latest version?

    // ideally need to fetch details for main package - although in reality that may not
    // be on npm anyway - can just obtain license from package.json file :D
    // let primary = await axios(getNpmURL(name, version))

    let tree = await getTreeData(dependencies)
    let combined = aggregate(tree)
    return {
      statusCode: 200,
      body: JSON.stringify({ tree, combined, data })
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: JSON.stringify(err) }
  }
}

const checkInput = async input => {
  // could include validation here
  if (input.url) {
    let { data } = await axios(input.url)
    return data
  } else if (input.json) {
    return JSON.parse(input.json)
  } else {
    return new Error('Neither URL or JSON')
  }
}

const process = arr => {
   let topLevel =    
       _.chain(arr)
          .filter(a => {
    return a.dependencies
   })
   .map(a => {
     return a.parent
   })
   .value()
  let children = arr.map(i => {
    if (i.dependencies) {
      return process(i.dependencies)
    } else {
      return i.parent
    }
  })
  return _.flattenDeep(_.concat(topLevel, children))
}

const aggregate = arr => {
  return _.flattenDeep(process(arr))
}

const getURLs = dependencies => {
  return Object.entries(dependencies).map(i => {
    let [key, value] = i
    return getNpmURL(key, value)
  })
}

const getNpmURL = (name, version) => {
  let clean = semver.valid(semver.coerce(version))
  if (clean !== null) return `https://registry.npmjs.org/${name}/${clean}`
}

const filterDependencies = dependencies => {
  return _.omitBy(dependencies, (value, key) => {
    return key.startsWith('@')
  })
}

const getTreeData = async dependencies => {
  let filtered = filterDependencies(dependencies)
  let urls = getURLs(filtered).filter(f => {
    return f !== undefined
  })
  let promises = urls.map(async url => {
    let { data } = await axios(url)
    let { dependencies } = data
    if (dependencies && Object.keys(dependencies).length > 0) {
      return {
        parent: updateLicense(data),
        dependencies: await getTreeData(dependencies)
      }
    } else {
      return { parent: updateLicense(data) }
    }
  })
  // https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all
  let results = await Promise.all(
    promises.map(p =>
      p.catch(e => {
        return e
      })
    )
  )
  const valid = results.filter(result => !(result instanceof Error))
  return valid
}
