import flattenDeep from 'lodash.flattendeep'
import semver from 'semver'
import axios from 'axios'

export async function handler (event, context) {
  let url =
    'https://raw.githubusercontent.com/request/request/master/package.json' ||
    JSON.parse(event.body).url
  try {
    const res = await axios(url)
    let { dependencies } = res.data
    let data = await getTreeData(dependencies)
    return {
      statusCode: 200,
      body: JSON.stringify(flattenDeep(data))
    }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: JSON.stringify({ data: 'Error' }) }
  }
}

const getURLs = dependencies => {
  return Object.entries(dependencies).map(i => {
    let [key, value] = i
    let version = semver.valid(semver.coerce(value))
    if (version !== null) return getNpmURL(key, version)
  })
}

const getNpmURL = (name, version) => {
  return `https://registry.npmjs.org/${name}/${version}`
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
        return [data].concat(getTreeData(data.dependencies))
      } else {
        return data
      }
    })
  )
}
