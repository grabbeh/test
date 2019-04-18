import styled from 'styled-components'
import {
  space,
  width,
  color,
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection,
  propTypes
} from 'styled-system'
import theme from './theme'
import PropTypes from 'prop-types'

const Flex = styled.div`
  display: flex;
  ${space} ${width} ${color} ${alignItems} ${justifyContent} ${flexWrap} ${flexDirection};
`

Flex.defaultProps = {
  theme
}

Flex.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes,
  ...flexWrap.propTypes,
  ...flexDirection.propTypes
}

Flex.displayName = 'Flex'

export default Flex
