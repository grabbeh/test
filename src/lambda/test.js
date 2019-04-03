// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions

export function handler (event, context, callback) {
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Complete' })
  })
}
