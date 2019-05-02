import React, { useState, Fragment } from 'react'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import Flex from '../components/Flex'
import Dependency from '../components/Dependency'
import Summary from '../components/Summary'
import MainPackage from '../components/MainPackage'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import TextArea from '../components/TextArea'

const Example = () => {
  let [response, setResponse] = useState(null)
  let [loading, setLoading] = useState(false)
  let [json, setJSON] = useState('')
  let [url, setURL] = useState('')
  let [error, setError] = useState(null)

  const URLChange = e => {
    setURL(e.target.value)
  }

  const JSONChange = e => {
    setJSON(e.target.value)
  }

  const post = (e, input) => {
    setResponse(null)
    setLoading(true)
    axios
      .post('/.netlify/functions/submit-license', input)
      .then(r => {
        console.log(r)
        setLoading(false)
        setResponse(r.data)
      })
      .catch(err => {
        setLoading(false)
        console.log(err.response)
        setError(err.response.data)
      })
    e.preventDefault()
  }

  return (
    <Layout>
      <Header />
      <Box>
        <Tabs>
          <TabList>
            <Tab>
              <Text>URL</Text>
            </Tab>
            <Tab>
              <Text>Paste</Text>
            </Tab>
            <Tab>
              <Text>Upload</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <Box width={[1, 0.7, 0.5]}>
              <form
                onSubmit={e => {
                  post(e, { url: url })
                }}
              >
                <Input
                  borderRadius={2}
                  error={error}
                  width={1}
                  type='text'
                  handleChange={URLChange}
                  name='url'
                  fontSize={[2, 4]}
                  value={url}
                />
                <Box mt={3}>
                  <Flex justifyContent='flex-end'>
                    <Button disabled={loading} type='submit' px={3} py={2}>
                       { loading ? <Text fontSize={2}>Loading...</Text> : <Text color='white' fontSize={2}>Submit</Text>}
                    </Button>
                  </Flex>
                </Box>
              </form>
            </Box>
            <Box width={[1, 800]}>
              <form onSubmit={e => post(e, { json })}>
                <TextArea
                  width={1}
                  handleChange={JSONChange}
                  value={json}
                  height={400}
                  name='json'
                />
                <Box mt={3}>
                  <Flex justifyContent='flex-end'>
                    <Button disabled={loading} type='submit' px={3} py={2}>
                      { loading ? <Text fontSize={2}>Loading...</Text> : <Text color='white' fontSize={2}>Submit</Text>}
                    </Button>
                  </Flex>
                </Box>
              </form>
            </Box>
            <Box>
              <Text>Coming soon</Text>
            </Box>
          </TabPanels>
        </Tabs>

        <Box>
          {loading && (
            <Box py={3}>
              <Text fontSize={3} fontWeight='bold'>
                Loading
              </Text>
            </Box>
          )}
          <Box>
            {response && (
              <Fragment>
                <Box py={3}>
                  <Text fontSize={4} fontWeight='bold'>
                    Results
                  </Text>
                </Box>
                <MainPackage main={response.data} />
                <Box mt={3}>
                  <Text fontSize={3} fontWeight='bold'>
                    Dependencies
                  </Text>
                  <Text fontSize={3}>{response.combined.length}</Text>
                </Box>
                <Box>
                  <Summary dependencies={response.combined} />
                </Box>
              </Fragment>
            )}
          </Box>
          <Box>
            <Flex justifyContent='space-between' flexWrap='wrap'>
              {response &&
                response.tree.map((l, i) => {
                  return (
                    <Box width={[1, 1 / 2, 1 / 4, 1/ 6]} key={l.parent.name}>
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
