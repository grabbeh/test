import React, { useState, Fragment } from 'react'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import UrlForm from '../components/UrlForm'
import Summary from '../components/Summary'
import MainPackage from '../components/MainPackage'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import JSONForm from '../components/JSONForm'
import Table from '../components/Table'
import Tree from '../components/TreeStructure'
import Flex from '../components/Flex'
import Spinner from 'react-svg-spinner'

const Example = () => {
  let [response, setResponse] = useState(null)
  let [loading, setLoading] = useState(null)
  return (
    <Layout>
      <Flex flexWrap='wrap'>
        <Box bg='light-gray' p={[2, 3]} minHeight='100vh' width={[1, 0.3]}>
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
                <Box>
                  <UrlForm setLoading={setLoading} setResponse={setResponse} />
                </Box>
                <Box>
                  <JSONForm setLoading={setLoading} setResponse={setResponse} />
                </Box>
                <Box>
                  <Text>Coming soon</Text>
                </Box>
              </TabPanels>
            </Tabs>
          </Box>
          {response && (
            <Fragment>
              <Box py={2}>
                <Text fontSize={4} fontWeight='bold'>
                  Results
                </Text>
              </Box>
              <MainPackage main={response.data} />
              <Box>
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
        <Box p={[2, 3]} width={[1, 0.7]}>
          {loading && (
            <Flex
              height='100%'
              alignItems='center'
              flexWrap='wrap'
              justifyContent='center'
            >
              <Spinner size='64px' speed='slow' thickness={3} color='#1da1f2' />
            </Flex>
          )}
          {response && (
            <Tabs>
              <TabList>
                <Tab>
                  <Text color='black'>Tree</Text>
                </Tab>
                <Tab>
                  <Text color='black'>Table</Text>
                </Tab>
                <Tab>
                  <Text color='black'>Attribution</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <Tree tree={response.tree} />
                <Table dataRows={response.combined} />
                <Box>
                  <Text color='black'>Coming soon</Text>
                </Box>
              </TabPanels>
            </Tabs>
          )}
        </Box>
      </Flex>
    </Layout>
  )
}

export default Example
