import flattenDeep from 'lodash.flattendeep'
import semver from 'semver'
import axios from 'axios'

export async function handler (event, context) {
  let url =
    // 'https://raw.githubusercontent.com/request/request/master/package.json' ||
    JSON.parse(event.body).url
  try {
    const res = await axios(url)

    let { dependencies, name, version } = res.data
    // let primary = await axios(getNpmURL(name, version))
    let tree = await getTreeData(dependencies)

    return {
      statusCode: 200,
      body: JSON.stringify(flattenDeep(tree))
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: JSON.stringify({ data: 'Error' }) }
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
  return Promise.all(
    urls.map(async url => {
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
  )
}
