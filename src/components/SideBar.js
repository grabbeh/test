import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import TabList from './TabList'
import TabPanels from './TabPanels'
import UrlForm from './UrlForm'
import JSONForm from './JSONForm'
import Box from './Box'
import Text from './Text'

const SideBar = (props) => {
let { setLoading, setResponse } = props

return (
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

          </Box>)

}

export default SideBar
