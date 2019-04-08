const axios = require('axios')

exports.hander = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Hello, World! ' + Math.round(Math.random() * 10)
    })
  })
}
