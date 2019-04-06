export async function handler (event, context, callback) {
  return {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      msg: 'Hello, World! ' + Math.round(Math.random() * 10)
    })
  }
}
