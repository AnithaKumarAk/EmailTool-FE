import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";
import logo from "../../assets/logo.png"; // Import the logo image

function Sidebar() {
  return (
    <>
      <input id="menu__toggle" type="checkbox" />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="Logo" />
            </span>

            <div className="text logo-text">
              <span className="name">Bulk Email Tool</span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <Link to="/">
                  <i className="fa-sharp fa-solid fa-gauge-high icon"></i>
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/mailer">
                  <i className="fa-sharp fa-solid fa-envelopes-bulk icon"></i>
                  <span className="text nav-text">Mailer</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/groups">
                  <i className="fa-sharp fa-solid fa-user-group icon"></i>
                  <span className="text nav-text">Groups</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/sentdetails">
                  <i className="fa-sharp fa-solid fa-paper-plane icon"></i>
                  <span className="text nav-text">Sent</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/templates">
                  <i className="fa-solid fa-table-columns icon"></i>
                  <span className="text nav-text">Templates</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="bottom-content"></div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
