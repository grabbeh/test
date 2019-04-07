var axios = require('axios')
var _ = require('lodash')

export async function handler (event, context) {
  let url =
    'https://raw.githubusercontent.com/request/request/master/package.json'

  try {
    const res = await axios(url)
    let { dependencies } = res.data
    let names = _.keys(dependencies)
    let urls = names.map(name => {
      let version = dependencies[name]
      if (typeof version === 'string') {
        if (version.includes('~') || version.includes('^')) {
          version = version.substr(1)
        }
      }
      return `https://registry.npmjs.org/${name}/${version}`
    })
    let data = await mapUrls(urls)
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.log(err)
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
