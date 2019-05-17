import axios from 'axios'

const getLicenseText = (license, licenseText) => {
  if (licenseText) return licenseText
  let { data } = axios(`http://spdx.org/licenses/${license}.json`)
  console.log(data)
  return data.licenseText
}

export default getLicenseText
