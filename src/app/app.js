import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import Layout from "../components/layout"
import NavBar from "./components/nav-bar"
import Profile from "./profile"
import Main from "./main" // NOT SHOWN
import PrivateRoute from "./components/private-route"
import Login from "./login"

// remember everything in /app/* is dynamic now!
const App = () => {
  return (
    <Layout>
      <NavBar />
      <Router>
        <PrivateRoute path="/app/profile" component={Profile} />
        <PublicRoute path="/app">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Layout>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
