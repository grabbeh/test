const request = require('request')
const _ = require('lodash')
var async = require('async')

export function handler (event, context, callback) {
  console.log(JSON.parse(event.body))
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data: 'Hello World' })
  })
}
