import React, { useState, Fragment } from 'react'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import UrlForm from '../components/UrlForm'
import Flex from '../components/Flex'
import Dependency from '../components/Dependency'
import Summary from '../components/Summary'
import MainPackage from '../components/MainPackage'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import JSONForm from '../components/JSONForm'

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
            <Flex flexWrap='wrap'>
              {response &&
                response.tree.map((l, i) => {
                  return (
                    <Box width={[1, 1 / 3, 1 / 5]} key={l.parent.name}>
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
