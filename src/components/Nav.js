import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import IdentityContext from "../app/context/IdentityContext"
import Logout from "../app/components/Logout"

const Nav = () => {
  const { isLoggedIn } = useContext(IdentityContext) || false
  console.log(isLoggedIn)

  // const isLoggedIn = false

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link class="navbar-item" to="/">
          <img
            src="https://image.flaticon.com/icons/svg/760/760604.svg"
            width="112"
            height="28"
          />
        </Link>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/user/dashboard" className="navbar-item">
            Dashboard
          </Link>

          <div className="navbar-item ">
            <Link to="/user/test" className="navbar-link">
              Test
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isLoggedIn ? (
                <Logout />
              ) : (
                <>
                  <Link className="button is-primary" to="/user/login">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-light" to="/user/login">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Nav
