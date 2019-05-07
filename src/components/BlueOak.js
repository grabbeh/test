import styled, { css } from 'styled-components'
import Box from './Box'

const BlueOak = styled(Box)`
  background: #ff4136;
  ${props =>
    props.rating === 'Model' &&
    css`
      background: #137752;
    `};

  ${props =>
    props.rating === 'Gold' &&
    css`
      background: #19a974;
    `};
  ${props =>
    props.rating === 'Silver' &&
    css`
      background: #9eebcf;
    `};
  ${props =>
    props.rating === 'Bronze' &&
    css`
      background: #ff6300;
    `};
  ${props =>
    props.rating === 'Lead' &&
    css`
      background: #ff725c;
    `};
`

export default BlueOak
