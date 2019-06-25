import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Link to="/user/">
          <b>Go to App (with Netlify Identity)</b>
        </Link>
      </Layout>
    )
  }
}
export default IndexPage
