import React, { useEffect, useState } from 'react'
import fetch from 'isomorphic-fetch'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Button from '../components/Button'
import axios from 'axios'

const Example = () => {
  let [message, setMessage] = useState(false)
  useEffect(() => {
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(message => {
        setMessage(message.msg)
      })
  }, [])

  const postTest = e => {
    axios
      .post('/.netlify/functions/test', {
        test: 'Hello World'
      })
      .then(function (response) {
        console.log(response)
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
              {message}
            </Text>
          </Box>
        </Box>
        <Box p={3}>
          <Button onClick={postTest} px={3} py={2}>
            <Text fontSize={3}>Click me</Text>
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default Example
