import React from 'react'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import Logo from './Logo'
import Link from './Link'

const Header = () => (
  <Box pb={2} borderBottom='1px solid' borderColor='#fff'>
    <Flex justifyContent='flex-end'>
      <Box>
        <Link to='/about'>
          <Text fontWeight='bold'>About</Text>
        </Link>
      </Box>
    </Flex>
    <Flex flexWrap='wrap'>
      <Box mt={13} mr={2}>
        <Logo />
      </Box>
      <Text fontWeight='bold' fontSize={5}>
        License checker
      </Text>
    </Flex>
  </Box>
)

export default Header
