var request = require('request')
var _ = require('lodash')
var async = require('async')

export function handler (event, context, callback) {
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 410,
      body: 'Unsupported Request Method'
    })
  }
  var url = JSON.parse(event.body).url
  request({ url, json: true }, (error, response, body) => {
    if (error) console.log(error)
    getFullDependencyData(body.dependencies, callback)
    // extract out so function accepts either package.json file from github or details of data from npm
  })
}

// dependencies are an object structure of { request: 1.0.0, express: 2.0.0 } etc
function getFullDependencyData (dependencies, callback) {
  var deps = _.keys(dependencies)
  var urls = deps.map(dep => {
    var version = dependencies[dep]
    if (typeof version === 'string') {
      if (version.includes('~') || version.includes('^')) {
        version = version.substr(1)
      }
    }
    return `https://registry.npmjs.org/${dep}/${version}`
  })
  // need to decide data structure for sub-dependencies
  var data = []
  async.each(
    urls,
    (url, cb) => {
      request({ url, json: true }, (error, response, dependencyData) => {
        if (error) console.log(error)

        data.push(dependencyData)
        if (dependencyData.dependencies) {
          getFullDependencyData(dependencyData.dependencies)
        }
        cb()
      })
    },
    err => {
      if (err) {
        console.log('A url failed to process')
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
        })
      }
    }
  )
}
