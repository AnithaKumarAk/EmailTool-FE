import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

// Import the user profile image
import userProfileImage from "../../assets/user.png";

function Navbar() {
  return (
    <div className='top-nav'>
      <div className='user-profile'>
        <img src={userProfileImage} alt='User profile' />
        <div className='user-dropdown'>
          <Link to='/logout'>
            <div className='nav-items'>
              <i className='fa-sharp fa-solid fa-right-from-bracket' />
              Logout
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
