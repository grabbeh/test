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
    setLicenseData(null)
    setLoading(true)
    fetch('/.netlify/functions/test')
      .then(r => r.json())
      .then(r => {
        console.log(r)
        setLicenseData(r)
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      <Box p={[2, 4]}>
        {loading && <Box p={3}>Loading</Box>}
        <Box>
          {licenseData && (
            <Text fontSize={3} fontWeight='bold'>
              Dependencies
            </Text>
          )}
        </Box>
        <Box>
          <Flex flexWrap='wrap'>
            {licenseData &&
              licenseData.map((l, i) => (
                <Box key={i} width={[1,200]} p={2} bg='navy' mt={3} mr={3}>
                  <Text color='white' fontWeight='bold' fontSize={3}>
                    {l.name}
                  </Text>
                  <Text color='orange' fontSize={2}>
                    {l.license}
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
