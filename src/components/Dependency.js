import React, { Fragment } from 'react'
import Text from './Text'
import { FiCornerDownRight } from 'react-icons/fi'
import LicenseBar from './LicenseBar'

const Dependency = ({ parent, dependencies, number }) => {
  return (
    <Fragment>
      <LicenseBar
        borderColor='black-50'
        border='solid 4px'
        width={200}
        p={3}
        mt={3}
        license={parent.license}
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
      </LicenseBar>
    </Fragment>
  )
}

export default Dependency
