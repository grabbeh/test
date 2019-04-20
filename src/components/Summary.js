import React from 'react'
import _ from 'lodash'
import LicenseBar from './LicenseBar'
import Flex from './Flex'

const Summary = ({ dependencies }) => {
  const revised = _.sortBy(dependencies, 'license')
  return (
    <Flex flexWrap='wrap'>
      {revised.map((d, i) => (
        <LicenseBar
          border='2px solid'
          borderRadius={2}
          m={1}
          key={i}
          width={30}
          height={30}
          license={d.license}
        />
      ))}
    </Flex>
  )
}

export default Summary
