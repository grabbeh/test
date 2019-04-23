import React from 'react'
import _ from 'lodash'
import LicenseBar from './LicenseBar'
import Flex from './Flex'
import Box from './Box'
import Text from './Text'

const Summary = ({ dependencies }) => {
  const revised = _.sortBy(dependencies, 'license')

  let group = _.values(_.groupBy(dependencies, 'license'))
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
          {revised.map((d, i) => (
            <LicenseBar
              border='2px solid'
              borderRadius={2}
              mr={1}
              my={1}
              key={i}
              width={30}
              height={30}
              license={d.license}
            />
          ))}
        </Flex>
      </Box>
      <Box my={3}>
        <Flex flexWrap='wrap'>
          {updated.map((g, i) => (
            <Box key={i} mr={3}>
              <Box>
                <Text fontWeight='bold'>{g.license}</Text>
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