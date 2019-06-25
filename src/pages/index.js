import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Link to="/user/">
          <b>Go to App (with Netlify Identity)</b>
        </Link>
      </Layout>
    )
  }
}
export default IndexPage
