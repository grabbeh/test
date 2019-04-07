import axios from 'axios'
import _ from 'lodash'

export async function handler (event, context) {
  let url =
    'https://raw.githubusercontent.com/request/request/master/package.json' ||
    JSON.parse(event.body).url
  try {
    const res = await axios(url)
    let { dependencies } = res.data
    let urls = getURLs(dependencies)
    let data = await mapUrls(urls)
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    return { statusCode: 500 }
  }
}

const mapUrls = async urls => {
  let dependencyData = []
  for (var i = 0, l = urls.length; i < l; i++) {
    let url = urls[i]
    let { data } = await axios(url)
    dependencyData.push(data)
  }
  return dependencyData
}

const getURLs = dependencies => {
  return Object.entries(dependencies).map(i => {
    let [key, value] = i
    return getNpmURL(key, value)
  })
}

const getNpmURL = (name, version) => {
  if (typeof version === 'string') {
    if (version.includes('~') || version.includes('^')) {
      version = version.substr(1)
    }
  }
  return `https://registry.npmjs.org/${name}/${version}`
}
