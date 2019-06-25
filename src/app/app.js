import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

function Test() {
  return <div>this is a test</div>
}

function App() {
  return (
    <>
      <Router>
        <Home path="/" />
        <About path="/user/about" />
        <Login path="/user/login" />
        <PrivateRoute as={Test} path="/user/test" />
        <PrivateRoute as={Dashboard} path="/user/dashboard" />
      </Router>
    </>
  )
}
export default App
