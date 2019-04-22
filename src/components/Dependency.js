import React, { Fragment } from 'react'
import Text from './Text'
import { FiCornerDownRight } from 'react-icons/fi'
import LicenseBar from './LicenseBar'

const Dependency = ({ parent, dependencies, number }) => {
  return (
    <Fragment>
      <LicenseBar
        key={parent.name}
        borderColor='black'
        border='solid 3px'
        width={[0.6, 150]}
        p={3}
        mt={3}
        borderRadius={2}
        license={parent.license}
      >
        <FiCornerDownRight />
        <Text fontWeight='bold' fontSize={[2, 3]}>
          {number}. {parent.name}
        </Text>
        <Text fontSize={2}>{parent.license}</Text>
        {dependencies && (
          <Text>
            {dependencies.map((d, i) => (
              <Dependency number={i + 1} key={i} {...d} />
            ))}
          </Text>
        )}
      </LicenseBar>
    </Fragment>
  )
}

export default Dependency
