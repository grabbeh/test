var request = require('request')

export function handler (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data: 'Hello World' })
  })
}
