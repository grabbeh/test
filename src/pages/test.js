import React, { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Flex from '../components/Flex'

const Test = () => {
  let [licenseData, setLicenseData] = useState()
  let [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('/.netlify/functions/test')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setLicenseData(response)
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      <Box p={4}>
        {loading && <Box p={3}>Loading</Box>}
        <Box mt={3}>
          {licenseData && (
            <Text fontSize={3} fontWeight='bold'>
              Dependencies
            </Text>
          )}
        </Box>
        <Box>
          <Flex flexWrap='wrap'>
            {licenseData &&
              licenseData.map(i => (
                <Box width={200} p={2} bg='blue' mt={3} mr={3}>
                  <Text color='white' fontWeight='bold' fontSize={3}>
                    {i.name}
                  </Text>
                  <Text fontWeight='bold' fontSize={3}>
                    {i.license}
                  </Text>
                </Box>
              ))}
          </Flex>
        </Box>
      </Box>
    </Layout>
  )
}

export default Test
