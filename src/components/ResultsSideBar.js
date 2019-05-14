import React from 'react'
import Box from './Box'
import Text from './Text'
import MainPackage from './MainPackage'
import Summary from './Summary'

const ResultsSideBar = props => {
  let { response } = props
  return (
    <Box>
      <Text fontSize={4} fontWeight='bold'>
        Results
      </Text>
      <MainPackage main={response.data} />
      <Text fontSize={3} fontWeight='bold'>
        Dependencies
      </Text>
      <Text fontSize={3}>{response.combined.length}</Text>
      <Summary dependencies={response.combined} />
    </Box>
  )
}

export default ResultsSideBar
