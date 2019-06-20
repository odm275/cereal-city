import React, { createContext, useContext, useRef, useState } from "react"
import { Link, navigate } from "gatsby"
import { Router } from "@reach/router"
import { useNetlifyIdentity } from "react-netlify-identity"
import useLoading from "./components/useLoading"

let IdentityContext = createContext()

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

function Login() {
  const { loginUser, signupUser } = useContext(IdentityContext)
  const formRef = useRef()
  const [msg, setMsg] = useState("")
  const [isLoading, load] = useLoading()
  const signup = () => {
    const email = formRef.current.email.value
    const password = formRef.current.password.value
    load(signupUser(email, password))
      .then(user => {
        console.log("Success! Signed up", user)
        navigate("/app/dashboard")
      })
      .catch(err => console.error(err) || setMsg("Error: " + err.message))
  }
  return (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        load(loginUser(email, password))
          .then(user => {
            console.log("Success! Logged in", user)
            navigate("/app/dashboard")
          })
          .catch(err => console.error(err) || setMsg("Error: " + err.message))
      }}
    >
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <input type="submit" value="Log in" />
          <button onClick={signup}>Sign Up </button>
          {msg && <pre>{msg}</pre>}
        </div>
      )}
    </form>
  )
}

function Home() {
  return (
    <div>
      <h3>Welcome to da shop!</h3>
    </div>
  )
}

function About() {
  return <div>About</div>
}

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

function Spinner() {
  return (
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  )
}
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
function Logout() {
  const { logoutUser } = useContext(IdentityContext)
  return <button onClick={logoutUser}>You are signed in. Log Out</button>
}
function Test() {
  return <div>this is a test</div>
}

function App() {
  // TODO: SUPPLY A URL EITHER FROM ENVIRONMENT VARIABLES OR SOME OTHER STRATEGY
  // e.g. 'https://unruffled-roentgen-04c3b8.netlify.com'
  const [url, setUrl] = useState("https://cereal-city.netlify.com")
  const handler = e => setUrl(e.target.value)
  const identity = useNetlifyIdentity(url)
  console.log({ identity, url })
  return (
    <IdentityContext.Provider value={identity}>
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
    </IdentityContext.Provider>
  )
}
export default App
