import React from 'react'
import Box from '../components/Box'
import Text from '../components/Text'

const AttributionList = ({ dependencies }) => {
  return (
    <Box>
      {dependencies.map(d => {
        return d.licenses.map((l, i) => (
          <Box pb={2} borderBottom='2px solid' borderColor='black' key={i}>
            <Box py={2}>
            <Text fontWeight='bold'>{d.name}</Text>
            </Box>
            
            <Text>{l.licenseText}</Text>
          </Box>
        ))
      })}
    </Box>
  )
}

export default AttributionList
