import Spinner from 'react-svg-spinner'
import Flex from './Flex'

const Loading = () => (
  <Flex
    height='100%'
    alignItems='center'
    flexWrap='wrap'
    justifyContent='center'
  >
    <Spinner size='64px' speed='slow' thickness={3} color='#1da1f2' />
  </Flex>
)

export default Loading
