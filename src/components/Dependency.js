import React, { Fragment, useState } from 'react'
import Text from './Text'
import Box from './Box'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled, { css } from 'styled-components'

const Dependency = ({ parent, dependencies }) => {
  let [hidden, setHidden] = useState(true)
  return (
    <Fragment>
      <BlueOak
        key={parent.name}
        p={2}
        pl={3}
        mr={3}
        mb={3}
        borderRadius={2}
        boxShadowSize='sm'
        position='relative'
        rating={parent.licenses[0].color}
      >
        <Text fontWeight='bold' fontSize={[2, 3]}>
          {parent.name}
        </Text>
        {parent.licenses.map((l, i) => {
          return (
            <BlueOak key={i} rating={l.color}>
              <Text fontSize={2}>{l.license ? l.license : 'Unknown'}</Text>
            </BlueOak>
          )
        })}
        <Text fontSize={1}>
          {parent.author ? parent.author.name : 'Unknown'}
        </Text>
        {dependencies && (
          <Text>
            {dependencies && (
              <Box
                onClick={() => {
                  setHidden(!hidden)
                }}
              >
                {hidden ? (
                  <Text.s pointer fontWeight='bold' fontSize={4}>
                    <FiChevronUp />
                  </Text.s>
                ) : (
                  <Text pointer fontWeight='bold' fontSize={4}>
                    <FiChevronDown />
                  </Text>
                )}
              </Box>
            )}
            {dependencies.map((d, i) => (
              <Fragment key={i}>
                <HideStyled hidden={hidden}>
                  <Dependency number={i + 1} {...d} />
                </HideStyled>
              </Fragment>
            ))}
          </Text>
        )}
      </BlueOak>
    </Fragment>
  )
}

const HideStyled = styled.div`
  ${props =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`
export default Dependency
