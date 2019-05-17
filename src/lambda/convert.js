import _ from 'lodash'
import blueoak from '@blueoak/list'
import getLicenseText from './getLicenseText'

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

// This gets Blue Oak rating of permissive license
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
  let { license, licenses, licenseText } = o
  // if just one license, things are simple, just return object with license/color
  if (license && typeof license !== 'object') {
    return [
      {
        license: license,
        licenseText: getLicenseText(license, licenseText),
        color: getColor(license, revised)
      }
    ]
    // sometimes license can be object with license.type notation
  }
  if (license && typeof license === 'object') {
    return [
      {
        license: license.type,
        licenseText: getLicenseText(license.type, licenseText),
        color: getColor(license.type, revised)
      }
    ]
  }
  // if multiple licenses, map over each to return type
  if (licenses) {
    return licenses.map(({ type }) => {
      return {
        license: type,
        licenseText: getLicenseText(type, licenseText),
        color: getColor(type, revised)
      }
    })
  }
  return [{ license: null, color: null }]
}

const updateLicense = o => {
  // regardless of whether license or licenses, we just put info into 'licenses' variable
  let licenses = updateLicenseInfo(o)
  return {
    ...o,
    licenses
  }
}

export default updateLicense
