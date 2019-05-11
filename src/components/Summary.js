import React from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'
import BlueOak from './BlueOak'

// filter for uniques, except if more than one license type
// sort alphabetically
const Summary = ({ dependencies }) => {
  let colors = dependencies.map(d => {
    return d.licenses.map(l => {
      return l.color
    })
  })

  let licenses = dependencies.map(d => {
    return d.licenses.map(l => {
      return l.license
    })
  })

  let f = _.countBy(_.flatten(licenses))
  let u = _.flatten(colors)

  return (
    <Box>
      <Box>
        <Flex flexWrap='wrap'>
          {u.map((d, i) => (
            <BlueOak
              mr={2}
              my={1}
              borderRadius={2}
              key={i}
              width={30}
              height={30}
              rating={d}
            />
          ))}
        </Flex>
      </Box>
      <Box my={3}>
        <Flex flexWrap='wrap'>
          {Object.keys(f).map((keyName, keyIndex) => (
            <Box key={keyIndex} mr={3}>
              <Box>
                <Text fontWeight='bold'>{keyName || 'Unknown'}</Text>
              </Box>
              <Box>
                <Text>{f[keyName]}</Text>
              </Box>
            </Box>
            // use keyName to get current key's name
            // and a[keyName] to get its value
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default Summary
