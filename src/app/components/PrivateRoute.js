import React, { useContext } from "react"
import Login from "./Login"
import IdentityContext from "../context/IdentityContext"

function PrivateRoute(props) {
  const identity = useContext(IdentityContext)
  let { as: Comp, ...rest } = props
  return identity.user ? (
    <Comp {...rest} />
  ) : (
    <div>
      <h3>You are trying to view a protected page. Please log in</h3>
      <Login />
    </div>
  )
}

export default PrivateRoute
