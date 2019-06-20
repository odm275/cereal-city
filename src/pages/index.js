import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  state = { loading: false, msg: null }
  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/hello-world")
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => {
        console.log("json")
        console.log(json)
        this.setState({ loading: false, msg: json.msg })
      })
  }

  render() {
    const { loading, msg } = this.state
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Link to="/app/">
          <b>Go to App (with Netlify Identity)</b>
        </Link>
      </Layout>
    )
  }
}
export default IndexPage
