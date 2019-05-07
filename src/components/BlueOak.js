import styled, { css } from 'styled-components'
import Box from './Box'

const BlueOak = styled(Box)`
  background: red;
  ${props =>
    props.rating === 'Model' &&
    css`
      background: #ffffff;
    `};

  ${props =>
    props.rating === 'Gold' &&
    css`
      background: #ffd700;
    `};
  ${props =>
    props.rating === 'Silver' &&
    css`
      background: #c0c0c0;
    `};
  ${props =>
    props.rating === 'Bronze' &&
    css`
      background: #cd7f32;
    `};
  ${props =>
    props.rating === 'Lead' &&
    css`
      background: #808080;
    `};
`

export default BlueOak
