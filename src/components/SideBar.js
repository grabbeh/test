import React from 'react'

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
