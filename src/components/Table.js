import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Text from './Text'

const FullTable = props => {
  let { dataRows } = props
  let rows = dataRows.map(d => {
    if (!d.license) d.license = 'Unknown'
    return d
  })
  // update to get licenses info
  let picked = rows.map(r => {
    return _.pick(r, ['name', 'license'])
  })
  let dataColumns = _.keys(picked[0])
  const tableHeaders = (
    <thead>
      <Tr>
        {dataColumns.map((column, i) => (
          <Td key={i}>
            <Text fontWeight='bold' color='black'>
              {column}
            </Text>
          </Td>
        ))}
      </Tr>
    </thead>
  )

  const tableBody = picked.map(row => (
    <Tr>
      {dataColumns.map((column, i) => {
        return (
          <Td key={i}>
            <Text color='black'>{row[column]}</Text>
          </Td>
        )
      })}
    </Tr>
  ))

  return (
    <Table>
      {tableHeaders}
      {tableBody}
    </Table>
  )
}

export default FullTable

const Tr = styled('tr')`
  border-bottom: 1px solid #ddd;
  &:nth-child(even) {
    background: rgba(42, 117, 146, 0.12);
  }
`

const Table = styled('table')`
  table-layout: fixed;
  border-collapse: collapse;
  background: white;
  border: solid 1px #ddd;
`

const Th = styled('th')`
  padding: 10px;
  width: 100px;
`

const Td = styled('td')`
  padding: 5px;
  border-right: 1px solid #ddd;
`
