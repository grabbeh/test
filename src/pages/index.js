import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import axios from 'axios'
import { graphql } from 'gatsby'
import Box from '../components/Box'
import Layout from '../components/Layout'
import Text from '../components/Text'
import Header from '../components/Header'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import TabList from '../components/TabList'
import TabPanels from '../components/TabPanels'
import Table from '../components/Table'
import Tree from '../components/TreeStructure'
import Flex from '../components/Flex'
import InputSideBar from '../components/InputSideBar'
import ResultsSideBar from '../components/ResultsSideBar'
import Loading from '../components/Loading'
import AttributionList from '../components/AttributionList'

const Example = ({ location, data: { markdownRemark } }) => {
  let { html } = markdownRemark
  let [response, setResponse] = useState(null)
  let [loading, setLoading] = useState(null)

  useEffect(() => {
    let { url } = qs.parse(location.search)
    console.log(url)
    if (url) {
      setLoading(true)
      axios
        .post('/.netlify/functions/submit-license', { url })
        .then(r => {
          setResponse(r.data)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <Layout>
      <Flex flexWrap='wrap'>
        <Box
          bg='light-gray'
          p={[2, 3]}
          minHeight={[1, '100vh']}
          width={[1, 0.3]}
        >
          <Header />
          <InputSideBar setLoading={setLoading} setResponse={setResponse} />
          {response && <ResultsSideBar response={response} />}
        </Box>
        <Box bg='light-gray' height='100vh' p={[2, 3]} width={[1, 0.7]}>
          {loading && <Loading />}
          {!response && !loading && (
            <Box dangerouslySetInnerHTML={{ __html: html }} />
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
                  <AttributionList dependencies={response.combined} />
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

export const query = graphql`
  query {
    markdownRemark {
      html
    }
  }
`
