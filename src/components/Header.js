import React from 'react'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'

const Header = () => (
  <Box>
    <Flex justifyContent='flex-end'>
      <Box>
        <Text fontWeight='bold'>About</Text>
      </Box>
    </Flex>
    <Text fontWeight='bold' fontSize={5}>
      License checker
    </Text>
  </Box>
)

export default Header
