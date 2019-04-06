import request from 'request'
import _ from 'lodash'
import async from 'async'

export function handler (event, context, callback) {
  var url = JSON.parse(event.body).url
  request({ url, json: true }, function (error, response, body) {
    var deps = _.keys(body.dependencies)
    var urls = deps.map(dep => {
      var version = body.dependencies[dep]
      if (typeof version === 'string') {
        if (version.includes('~') || version.includes('^')) {
          version = version.substr(1)
        }
      }
      return `https://registry.npmjs.org/${dep}/${version}`
    })
    var data = []
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
