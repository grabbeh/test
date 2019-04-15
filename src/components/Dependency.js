import React, { Fragment } from 'react'
import Box from './Box'
import Text from './Text'
import { FiCornerDownRight } from 'react-icons/fi'

const Dependency = ({ parent, dependencies, number }) => {
  return (
    <Fragment>
      <Box
        borderColor='black-50'
        border='solid 4px'
        width={200}
        p={3}
        mt={3}
        bg={parent.license}
      >
        <FiCornerDownRight />
        <Text fontWeight='bold' fontSize={3}>
          {number}. {parent.name}
        </Text>
        <Text fontSize={2}>{parent.license}</Text>
        {dependencies && (
          <Text>
            {dependencies.map((d, i) => (
              <Dependency number={i + 1} key={d.name} {...d} />
            ))}
          </Text>
        )}
      </Box>
    </Fragment>
  )
}

export default Dependency
