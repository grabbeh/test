import _ from 'lodash'
import blueoak from '@blueoak/list'

// convert BO license data into more accessible format
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

const updateLicenseInfo = o => {
  let { license, licenses } = o
  // if just one license, things are simple, just return object with license/color
  if (license && typeof license !== 'object') {
    return [{ license: license, color: getColor(license, revised) }]
    // sometimes license can be object with license.type notation
  }
  if (license && typeof license === 'object') {
    return [{ license: license.type, color: getColor(license.type, revised) }]
  }
  // if multiple licenses, map over each to return type
  if (licenses) {
    let extracted = licenses.map(l => {
      return l.type
    })
    return extracted.map(l => {
      return {
        license: l,
        color: getColor(l, revised)
      }
    })
  }
  return [{ license: null, color: null }]
}

const updateLicense = o => {
  let licenses = updateLicenseInfo(o)
  return {
    ...o,
    licenses
  }
}

export default updateLicense
