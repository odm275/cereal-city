import React, { useContext } from "react"
import IdentityContext from "../context/IdentityContext"

function Logout() {
  const { logoutUser } = useContext(IdentityContext)
  return <button onClick={logoutUser}>You are signed in. Log Out</button>
}

export default Logout
