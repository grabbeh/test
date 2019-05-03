import React from 'react'
import Helmet from 'react-helmet'
import Box from '../components/Box'
import '../index.css'

const Layout = props => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <title>License checker</title>
      </Helmet>
      <Box minHeight='100vh' bg='t-blue' p={[2, 4]}>
        {props.children}
      </Box>
    </div>
  )
}

export default Layout
