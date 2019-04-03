const request = require('request')
const _ = require('lodash')
var async = require('async')

export function handler (event, context, callback) {
  console.log('Fn triggered')
  console.log(event)
  var url = JSON.parse(event.body).url
  request({ url, json: true }, function (error, response, body) {
    let deps = _.keys(body.dependencies)
    let urls = deps.map(dep => {
      let version = body.dependencies[dep]
      if (typeof version === 'string') {
        if (version.includes('~') || version.includes('^')) {
          version = version.substr(1)
        }
      }
      return `https://registry.npmjs.org/${dep}/${version}`
    })
    let data = []

    async.each(
      urls,
      function (url, cb) {
        request({ url, json: true }, function (error, response, body) {
          if (error) console.log(error)
          data.push(body)
          cb()
        })
      },
      function (err) {
        if (err) {
          console.log('A file failed to process')
        } else {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(data)
          })
        }
      }
    )
  })
}
