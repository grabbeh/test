import React from 'react'
import Box from '../components/Box'

const AttributionList = ({ dependencies }) => {
  return (
    <Box borderBottom='2px solid' borderColor='black'>
      {dependencies.map(d => {
        return d.licenses.map((l, i) => <Box key={i}>{l.licenseText}</Box>)
      })}
    </Box>
  )
}

export default AttributionList
