import React, { Fragment, useState } from 'react'
import Text from './Text'
import Box from './Box'
import { FiCornerDownRight, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import LicenseBar from './LicenseBar'
import styled, { css } from 'styled-components'

const Dependency = ({ parent, dependencies, number }) => {
  let [hidden, setHidden] = useState(true)

  return (
    <Fragment>
      <LicenseBar
        key={parent.name}
        borderColor='black'
        border='solid 3px'
        width={[0.6, 200]}
        p={3}
        mt={3}
        borderRadius={2}
        license={parent.license}
      >
        <FiCornerDownRight />
        <Text color='black' fontWeight='bold' fontSize={[2, 3]}>
          {number}. {parent.name}
        </Text>
        <Text color='black' fontSize={2}>
          {parent.license ? parent.license : 'Unknown'}
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
                  <Text color='black' p={0} fontWeight='bold' fontSize={4}>
                    <FiChevronUp />
                  </Text>
                ) : (
                  <Text color='black' p={0} fontWeight='bold' fontSize={4}>
                    <FiChevronDown />
                  </Text>
                )}
              </Box>
            )}
            {dependencies.map((d, i) => (
              <Fragment>
                <HideStyled hidden={hidden}>
                  <Dependency number={i + 1} key={i} {...d} />
                </HideStyled>
              </Fragment>
            ))}
          </Text>
        )}
      </LicenseBar>
    </Fragment>
  )
}

const HideStyled = styled.div`
  ${props =>
    props.hide === 'ISC' &&
    css`
      visibility: hidden;
    `};
`
export default Dependency
