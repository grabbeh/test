export async function handler (event, context, callback) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Hello, World! ' + Math.round(Math.random() * 10)
    })
  }
}
