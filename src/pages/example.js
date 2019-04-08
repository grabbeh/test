import React, { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import Flex from '../components/Flex'

const Example = () => {
  let [numbers, setMessage] = useState(false)
  let [licenseData, setLicenseData] = useState()
  let [url, setURL] = useState()
  useEffect(() => {
    setURL('')
    fetch('/.netlify/functions/submit-license')
      .then(response => response.json())
      .then(data => {
        console.log(numbers)
        setMessage(data.numbers)
      })
  }, [])

  const inputChange = e => {
    setURL(e.target.value)
  }

  const postURL = e => {
    axios
      .post('/.netlify/functions/submit-license', {
        url
      })
      .then(function (response) {
        console.log(response)
        setLicenseData(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    e.preventDefault()
  }

  return (
    <Layout>
      <Box p={4}>
        <Box mb={4}>
          <Box p={4} bg='red'>
            <Text color='white' fontWeight='bold' fontSize={5}>
              {numbers.map(n => ({ n }))}
            </Text>
          </Box>
        </Box>
        <Box p={3}>
          <form onSubmit={postURL} name='url-collection' method='POST'>
            <Input
              width={800}
              type='text'
              handleChange={inputChange}
              name='url'
              label='Hit me with a package.json file'
              fontSize={4}
              value={url}
            />
            <Box mt={3}>
              <Button type='submit' px={3} py={2}>
                <Text fontSize={3}>Click me</Text>
              </Button>
            </Box>
          </form>
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
      </Box>
    </Layout>
  )
}

export default Example
