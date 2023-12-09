import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../../functions/auth';
import logo from '../../../public/logo.svg';
import './home.css';

function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');

  useEffect(() => {
    auth.checkLoggedInStatus(setLoggedIn, setUserName);
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div className="home">
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
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto my-2">
              {isLoggedIn && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Other
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                    <li>
                      <Link to="/member-list" className="nav-link mx-2">
                        Member List
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            <Link to="/member-list" className="nav-link mx-2">
              Events
            </Link>
            <Link to="/member-list" className="nav-link mx-2">
              News
            </Link>
            <Link to="/member-list" className="nav-link mx-2">
              About Us
            </Link>
            <ul className="navbar-nav ms-2">
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

export default Home;
