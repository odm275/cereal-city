import React, { useContext, useState } from "react"
import IdentityContext from "../context/IdentityContext"
import useLoading from "./useLoading"
import Spinner from "./Spinner"
function Dashboard() {
  const props = useContext(IdentityContext)
  const { isConfirmedUser, authedFetch } = props
  const [isLoading, load] = useLoading()
  const [msg, setMsg] = useState("Click to load something")
  const handler = () => {
    load(authedFetch.get("/.netlify/functions/auth-end-point")).then(setMsg)
  }
  return (
    <div>
      <h3>This is a Protected Dashboard!</h3>
      {!isConfirmedUser && (
        <pre style={{ backgroundColor: "papayawhip" }}>
          You have not confirmed your email. Please confirm it before you ping
          the API.
        </pre>
      )}
      <hr />
      <div>
        <p>You can try pinging our authenticated API here.</p>
        <p>
          If you are logged in, you should be able to see a `user` info here.
        </p>
        <button onClick={handler}>Ping authenticated API</button>
        {isLoading ? <Spinner /> : <pre>{JSON.stringify(msg, null, 2)}</pre>}
      </div>
    </div>
  )
}
export default Dashboard
