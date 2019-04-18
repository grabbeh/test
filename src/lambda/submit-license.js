import flattenDeep from 'lodash.flattendeep'
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
    // version not found error

    // ideally need to fetch details for main package - although in reality that may not
    // be on npm anyway - can just obtain license from package.json file :D
    // let primary = await axios(getNpmURL(name, version))
    let tree = await getTreeData(dependencies)
    return {
      statusCode: 200,
      // is flattenDeep needed?
      body: JSON.stringify(tree)
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: stringify({ data: err }) }
  }
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
    console.log(data)
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
  let results = await Promise.all(promises.map(p => p.catch(e => e)))
  // const valid = results.filter(result => !(result instanceof Error))
  console.log(results)
  return results
}
