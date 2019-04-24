import React from 'react'
import Box from '../components/Box'
import styled, { css } from 'styled-components'

const Tab = props => {
  return (
    <StyledTab
      mt={2}
      mb={3}
      mr={4}
      py={1}
      {...props}
      onClick={props.isDisabled ? null : props.onSelect}
    >
      {props.children}
    </StyledTab>
  )
}

const StyledTab = styled(Box)`
  cursor: pointer;
  &:hover {
    border-bottom: 2px #357edd solid;
  }
  ${props =>
    props.isActive &&
    css`
      border-bottom: 2px #357edd solid;
      font-weight: bold;
    `}
`

export default Tab
