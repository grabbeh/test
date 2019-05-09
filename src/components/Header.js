import React from 'react'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import Logo from './Logo'

const Header = () => (
  <Box pb={2} mb={2}>
    <Flex flexWrap='wrap'>
      <Text.s mt={13} mr={2}>
        <Logo />
      </Text.s>
      <Text fontWeight='bold' fontSize={5}>
        License checker
      </Text>
    </Flex>
  </Box>
)

export default Header
