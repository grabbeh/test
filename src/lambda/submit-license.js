import flattenDeep from 'lodash.flattendeep'

export async function handler (event, context) {
  let deep = [[1, 2], [3, 4]]
  return {
    statusCode: 500,
    body: JSON.stringify({ data: flattenDeep(deep) })
  }
}
