import _ from 'lodash'
import blueoak from '@blueoak/list'

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
  // if just one license, things are simple, just return object with license/color
  if (o.license) {
    return [{ license: o.license, color: getColor(o.license, revised) }]
  }
  // if multiple licenses, map over each to return type
  else if (o.licenses) {
    let extracted = o.licenses.map(l => {
      return l.type
    })
    extracted.map(l => {
      return {
        license: l,
        color: getColor(l, revised)
      }
    })
  } else {
    return [{ license: null, color: null }]
  }
}

const updateLicense = o => {
  let licenses = updateLicenseInfo(o)
  console.log(licenses)
  return {
    ...o,
    licenses
  }
}

export default updateLicense
