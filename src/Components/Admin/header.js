import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const location = useLocation();
 

  ///=================Logout===================///
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
   
  };

  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <Link to="/" class="navbar-brand" >
              <img src="/images/kwikbot-bran-logo.png" alt="" />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">
                    <Link
                      to="/admin/profile"
                      className={`nav-link ${
                        location.pathname.match(
                          /^\/admin\/(profile|changepassword)$/
                        )
                          ? "active"
                          : ""
                      }`}
                    >
                      Profile
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                  <Link
                    to="/admin/coversation"
                    className={`nav-link ${
                      location.pathname === "/admin/coversation" ? "active" : ""
                    }`}
                  >
                    Conversation
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/admin/mysubscribption"
                    className={`nav-link ${
                      location.pathname.match(
                        /^\/admin\/(mysubscribption|billinginformation|invoices)$/
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    Subscription
                  </Link>
                </li>

                <li class="nav-item">
                  <a class="nav-link">
                    <Link
                      to="/admin/addcontent"
                      className={`nav-link ${
                        location.pathname.match(
                          /^\/admin\/(addcontent|contenthistory)$/
                        )
                          ? "active"
                          : ""
                      }`}
                    >
                      Content{" "}
                    </Link>
                  </a>
                </li>
                <li class="nav-item">
                 
                    <a class="nav-link">
                <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-profile">
                  <img src="/images/profile-icon.png" alt="Profile" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout} className="btn-logout" >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </a>
                
                
                 
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
