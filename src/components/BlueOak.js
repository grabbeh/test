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
      background: #e8fdf5;
    `};
  ${props =>
    props.rating === 'Bronze' &&
    css`
      background: #fbf1a9;
    `};
  ${props =>
    props.rating === 'Lead' &&
    css`
      background: #ff725c;
    `};
`

export default BlueOak
