import React from 'react'
import Box from '../components/Box'
import Text from '../components/Text'

const AttributionList = ({ dependencies }) => {
  return (
    <Box borderBottom='2px solid' borderColor='black'>
      {dependencies.map(d => {
        return d.licenses.map((l, i) => (
          <Box key={i}>
            <Text>{d.name}</Text>
            <Text>{l.licenseText}</Text>
          </Box>
        ))
      })}
    </Box>
  )
}

export default AttributionList
