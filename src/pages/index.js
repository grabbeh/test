import React, { useState, Fragment } from 'react'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import Flex from '../components/Flex'
import _ from 'lodash'
import Dependency from '../components/Dependency'
import Summary from '../components/Summary'

const Example = () => {
  let [licenseData, setLicenseData] = useState(null)
  let [combined, setCombined] = useState(null)
  let [loading, setLoading] = useState(false)
  let [url, setURL] = useState('')

  const inputChange = e => {
    console.log(e.target.value)
    setURL(e.target.value)
  }

  const postURL = e => {
    setLoading(true)
    axios
      .post('/.netlify/functions/submit-license', {
        url
      })
      .then(r => {
        console.log(r.data)
        setLoading(false)
        setLicenseData(r.data.tree)
        setCombined(r.data.combined)
      })
      .catch(function (error) {
        console.log(error)
      })
    e.preventDefault()
  }

  return (
    <Layout>
      <Box p={[2, 4]}>
        <form onSubmit={postURL}>
          <Input
            width={[1, 800]}
            type='text'
            handleChange={inputChange}
            name='url'
            label='Please provide a link to a package.json file'
            fontSize={[2, 4]}
            value={url}
          />
          <Box mt={3}>
            <Button type='submit' px={3} py={2}>
              <Text fontSize={3}>Submit</Text>
            </Button>
          </Box>
        </form>
        <Box>
          {loading && (
            <Box py={3}>
              <Text fontSize={3} fontWeight='bold'>
                Loading
              </Text>
            </Box>
          )}
          <Box>
            {combined && (
              <Fragment>
                <Box mt={3}>
                  <Text fontSize={3} fontWeight='bold'>
                    Dependencies
                  </Text>
                  <Text fontSize={3}>{combined.length}</Text>
                </Box>
                <Box>
                  <Summary dependencies={combined} />
                </Box>
              </Fragment>
            )}
          </Box>

          <Box>
            <Flex flexWrap='wrap'>
              {licenseData &&
                licenseData.map((l, i) => {
                  return (
                    <Box key={l.parent.name} mr={6}>
                      <Dependency
                        number={i + 1}
                        parent={l.parent}
                        dependencies={l.dependencies}
                      />
                    </Box>
                  )
                })}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Example
