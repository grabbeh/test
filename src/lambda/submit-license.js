import flattenDeep from 'lodash.flattendeep'

export async function handler (event, context) {
  let deep = [[1, 2], [3, 4]]
  return {
    statusCode: 500,
    body: JSON.stringify({ data: flattenDeep(deep) })
  }
}

/*
// dependencies are an object structure of { request: 1.0.0, express: 2.0.0 } etc
function getFullDependencyData (dependencies, data) {
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
  async.each(
    urls,
    (url, cb) => {
      request({ url, json: true }, (error, response, dependencyData) => {
        if (error) console.log(error)

        data.push(dependencyData)
        if (dependencyData.dependencies) {
          console.log('Sub dependencies')
          getFullDependencyData(dependencyData.dependencies)
          cb()
        }
        cb()
      })
    },
    err => {
      if (err) {
        console.log('A url failed to process')
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        }
      }
    }
  )
}
*/
