import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div>
          <header class="home-v2">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img
              src="images/kwikbot-bran-logo.png" alt/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto my-2 my-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#why-kwikbot">Why kwikbot</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#success-stories">Success stories</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#our-approach">Our approach</a>
              </li>
            </ul>
            <div class="btn-login">
              <Link to="/admin/login" class="login-btuun-homev2" target="_blank">Login</Link>
            </div>
          </div>

        </div>

      </nav>
      <div class="container">
        <div class="hr"></div>
      </div>

    </header>
    </div>
  )
}

export default Header
