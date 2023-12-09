import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.svg';
import * as auth from '../../functions/auth';

function UserProfile() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');

  useEffect(() => {
    // Check login status when the component mounts
    auth.checkLoggedInStatus(setLoggedIn, setUserName);
    
    // Fetch user profile picture when the component mounts
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div className="User-Profile">
      <nav className="navbar navbar-expand-lg d-flex align-items-center px-5">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-center mx-2"
            />
            UKM Golf ITS
          </Link>
          <Link to="/member-list" className="nav-link ms-2">
            Member List
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={userProfilePicture} alt="" className="user-profile-image me-2" />
                    {userName}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider"></hr>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <Link to="/login" className="navbar-brand ms-auto">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                  >
                    Login
                  </button>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserProfile;
