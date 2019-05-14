import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'
import TabList from './TabList'
import TabPanels from './TabPanels'
import Box from './Box'
import Text from './Text'
import MainPackage from './MainPackage'
import Summary from './Summary'

const ResultsSideBar = (props) => {
  console.log(props)
  let { response } = props

return (
  <Box>

              <Box>

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

            </Box>
)
}

