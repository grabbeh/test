import React from 'react'
import _ from 'lodash'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'
import BlueOak from './BlueOak'

const Summary = ({ dependencies }) => {
  // need to factor in licenses info and colors info
  let group = _.values(_.groupBy(dependencies, 'license'))
  // No color any more :<
  let bars = _.values(_.groupBy(dependencies, 'color'))

  let colors = dependencies.map(d => {
    return d.licenses.map(l => {
      return l.color
    })
  })
  console.log(colors)

  bars.sort((a, b) => {
    return b.length - a.length
  })
  let u = _.flatten(colors)
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
          {u.map((d, i) =>
              <BlueOak
                mr={2}
                my={1}
                borderRadius={2}
                key={i}
                width={30}
                height={30}
                rating={d}
              />
          )}
        </Flex>
      </Box>
      <Box my={3}>
        <Flex flexWrap='wrap' />
      </Box>
    </Box>
  )
}

export default Summary

const licenseSummary = props => {
  return (
    <div>
      {props.updated.map((g, i) => (
        <Box key={i} mr={3}>
          <Box>
            <Text fontWeight='bold'>{g.license ? g.license : 'Unknown'}</Text>
          </Box>
          <Box>
            <Text>{g.length}</Text>
          </Box>
        </Box>
      ))}
    </div>
  )
}
