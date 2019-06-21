import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import { useNetlifyIdentity } from "react-netlify-identity" // Comes with variables and methods ready to be destructured.
import PrivateRoute from "./components/PrivateRoute"
import IdentityContext from "./context/IdentityContext"
import Nav from "./components/Nav"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

function Test() {
  return <div>this is a test</div>
}

function App() {
  // TODO: SUPPLY A URL EITHER FROM ENVIRONMENT VARIABLES OR SOME OTHER STRATEGY
  // e.g. 'https://unruffled-roentgen-04c3b8.netlify.com'
  const identity = useNetlifyIdentity("https://cereal-city.netlify.com")
  return (
    <IdentityContext.Provider value={identity}>
      <Layout>
        <div className="App">
          <div className="Appheader">
            <h1 className="title">
              <span>Netlify Identity</span>
              <span className="italic">&</span> <span>Reach Router</span>
              <span>
                Some stuff doesn't work on localhost, check docs or original
                example
              </span>
            </h1>
          </div>
          <Link to="/app/test">test</Link>
          <Nav />
          <Router>
            <Home path="/" />
            <About path="/app/about" />
            <Login path="/app/login" />
            <Test path="/app/test" />
            <PrivateRoute as={Dashboard} path="/app/dashboard" />
          </Router>
        </div>
      </Layout>
    </IdentityContext.Provider>
  )
}
export default App
