import flattenDeep from 'lodash.flattendeep'
// import groupBy from 'lodash.groupby'
import semver from 'semver'
import axios from 'axios'
import { stringify } from 'flatted/esm'

export async function handler (event, context) {
  let url =
    // 'https://raw.githubusercontent.com/request/request/master/package.json' ||
    JSON.parse(event.body).url
  try {
    const res = await axios(url)
    let { dependencies } = res.data

    // scoped packages error
    // version not found error - just grab repository details and then get latest version?

    // ideally need to fetch details for main package - although in reality that may not
    // be on npm anyway - can just obtain license from package.json file :D
    // let primary = await axios(getNpmURL(name, version))
    let tree = await getTreeData(dependencies)
    let combined = aggregate(tree)
    return {
      statusCode: 200,
      body: JSON.stringify({ tree, combined })
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: stringify({ data: err }) }
  }
}

const process = arr => {
  return arr.map(i => {
    if (i.dependencies) {
      return process(i.dependencies)
    } else {
      return i.parent
    }
  })
}

const aggregate = arr => {
  return flattenDeep(process(arr))
  /*
  return groupBy(r, 'license').map(i => {
    return {
      license: i[0].license,
      length: i.length
    }
  }) */
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

const getTreeData = async dependencies => {
  let urls = getURLs(dependencies).filter(f => {
    return f !== undefined
  })

  let promises = urls.map(async url => {
    let { data } = await axios(url)
    let { dependencies } = data
    if (dependencies && Object.keys(dependencies).length > 0) {
      return {
        parent: data,
        dependencies: await getTreeData(dependencies)
      }
    } else {
      return { parent: data }
    }
  })
  // https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all
  let results = await Promise.all(
    promises.map(p =>
      p.catch(e => {
        console.log(e)
        return e
      })
    )
  )
  // const valid = results.filter(result => !(result instanceof Error))
  return results
}
