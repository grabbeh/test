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

const Example = () => {
  let [response, setResponse] = useState(null)
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
              <UrlForm setResponse={setResponse} />
            </Box>
            <Box width={[1, 0.7, 0.5]}>
              <JSONForm setResponse={setResponse} />
            </Box>
            <Box>
              <Text>Coming soon</Text>
            </Box>
          </TabPanels>
        </Tabs>
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
          {response && (
            <Tabs>
              <TabList>
                <Tab>
                  <Text>Tree</Text>
                </Tab>
                <Tab>
                  <Text>Table</Text>
                </Tab>
                <Tab>
                  <Text>Attribution</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <Tree tree={response.tree} />
                <Table dataRows={response.combined} />
                <Box>
                  <Text>Coming soon</Text>
                </Box>
              </TabPanels>
            </Tabs>
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default Example
