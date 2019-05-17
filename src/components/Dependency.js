import React, { Fragment, useState } from 'react'
import Text from './Text'
import Box from './Box'
import Flex from './Flex'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import BlueOak from './BlueOak'
import styled, { css } from 'styled-components'

const Dependency = ({ parent, dependencies }) => {
  let [hidden, setHidden] = useState(true)
  let { name, author, licenses } = parent
  return (
    <Fragment>
      <Box
        bg='white'
        key={name}
        p={2}
        pl={3}
        mr={3}
        mb={3}
        borderRadius={2}
        boxShadowSize='sm'
        position='relative'
      >
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <Box width={0.7}>
          <Text fontWeight='bold' fontSize={[2, 3]}>
            {name}
          </Text>
          </Box>
          <Box width={0.2}>
          <Flex justifyContent='flex-end'>
             <BlueOak width={20} height={20} borderRadius={2} rating={licenses[0].color} />
          </Flex>
          </Box>
        </Flex>
        {licenses.length < 2 && <Text fontSize={2}>{licenses[0].license ? licenses[0].license : 'Unknown'}</Text>}
        {licenses.length > 1 && licenses.map((l, i) => {
          return (
            <Text key={i} fontSize={2}>{l.license ? l.license : 'Unknown'}</Text>
          )
        })}
        <Text fontSize={1}>
          {author ? author.name : 'Unknown'}
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
