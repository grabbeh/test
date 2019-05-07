import React from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'
import BlueOak from './BlueOak'

const Summary = ({ dependencies }) => {
  let group = _.values(_.groupBy(dependencies, 'license'))
  let bars = _.values(_.groupBy(dependencies, 'color'))

  bars.sort((a, b) => {
    return b.length - a.length
  })
  let u = _.flatten(bars)
  let updated = _.orderBy(
    group.map(i => {
      return {
        license: i[0].license,
        length: i.length
      }
    }),
    'length',
    'desc'
  )
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
              rating={d.color}
            />
          ))}
        </Flex>
      </Box>
      <Box my={3}>
        <Flex flexWrap='wrap'>
          {updated.map((g, i) => (
            <Box key={i} mr={3}>
              <Box>
                <Text fontWeight='bold'>
                  {g.license ? g.license : 'Unknown'}
                </Text>
              </Box>
              <Box>
                <Text>{g.length}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default Summary
