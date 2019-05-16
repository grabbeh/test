import React, { Fragment, useState } from 'react'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled, { css } from 'styled-components'

const Dependency = ({ parent, dependencies }) => {
  let [hidden, setHidden] = useState(true)
  return (
    <Fragment>
      <Box
        key={parent.name}
        p={2}
        pl={3}
        mr={3}
        mb={3}
        borderRadius={2}
        boxShadowSize='sm'
        position='relative'
      >
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <Text fontWeight='bold' fontSize={[2, 3]}>
            {parent.name}
          </Text>
          <BlueOak m={2} width={20} height={20} borderRadius={2} rating={parent.licenses[0].color} />
        </Flex>
        {parent.licenses.map((l, i) => {
          return (
            <Text key={i} fontSize={2}>{l.license ? l.license : 'Unknown'}</Text>
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
      </Box>
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
