import _ from 'lodash'
import blueoak from '@blueoak/list'

console.log(blueoak)

const convert = o => {
  return o.map(r => {
    return {
      name: r.name,
      licenses: _.flatten(
        r.licenses.map(l => {
          return _.values(_.pick(l, 'id'))
        })
      )
    }
  })
}

let revised = convert(blueoak)

const getColor = (license, info) => {
  let color = null
  info.forEach(r => {
    if (r.licenses.includes(license)) {
      color = r.name
    }
  })
  return color
}

const updateLicense = o => {
  return {
    ...o,
    color: getColor(o.license, revised)
  }
}

export default updateLicense
