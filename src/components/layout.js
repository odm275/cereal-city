import React from "react"
import PropTypes from "prop-types"
import { useNetlifyIdentity } from "react-netlify-identity" // Comes with variables and methods ready to be destructured.
import IdentityContext from "../app/context/IdentityContext"

import Footer from "./footer"
import Nav from "./Nav"
import "./mystyles.scss"

const Layout = ({ children }) => {
  const identity =
    useNetlifyIdentity("https://cereal-city.netlify.com") || false
  return (
    <>
      <IdentityContext.Provider value={identity}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </IdentityContext.Provider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
