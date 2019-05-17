import axios from 'axios'

const getLicenseText = async (license, licenseText) => {
  // TODO: filter down to get license types to fetch each license text just once rather than multiple
  // fetches
  if (!licenseText) {
    try {
      let result = await axios(`http://spdx.org/licenses/${license}.json`)
      return result.data.licenseText
    } catch (e) {
      return null
    }
  } else {
    return licenseText
  }
}

export default getLicenseText
