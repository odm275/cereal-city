import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"
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
      <div className="App">
        <Router>
          <Home path="/" />
          <About path="/user/about" />
          <Login path="/user/login" />
          <PrivateRoute as={Test} path="/user/test" />
          <PrivateRoute as={Dashboard} path="/user/dashboard" />
        </Router>
      </div>
    </IdentityContext.Provider>
  )
}
export default App
