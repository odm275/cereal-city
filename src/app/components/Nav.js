import React, { useContext } from "react"
import { Link } from "gatsby"
import IdentityContext from "../context/IdentityContext"
import Logout from "./Logout"

function Nav() {
  const { isLoggedIn } = useContext(IdentityContext)
  return (
    <nav>
      <Link to="/app">Home</Link> | <Link to="/app/dashboard">Dashboard</Link>
      {" | "}
      <span>
        {isLoggedIn ? <Logout /> : <Link to="/app/login">Log In/Sign Up</Link>}
      </span>
    </nav>
  )
}

export default Nav
