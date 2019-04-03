import React from 'react'
import Helmet from 'react-helmet'
import '../index.css'

const Layout = props => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <title>mbg.codes</title>
      </Helmet>
      <div>{props.children}</div>
    </div>
  )
}

export default Layout
