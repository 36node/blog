/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Router } from "react-router-dom"
import styled from "styled-components"
import { createBrowserHistory } from "history"

import Header from "./header"
import Footer from "./footer"
import Banner from "./banner"

const LayoutWrapper = styled.div`
  margin-top: 68px;
  background-color: #f8faff;
  overflow-x: hidden;
  a{
    color: #2E49D5;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Router history={createBrowserHistory()}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <LayoutWrapper>
        <Banner />
        <main>{children}</main>
        <Footer />
      </LayoutWrapper>
    </Router>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
