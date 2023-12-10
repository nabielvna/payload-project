import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import * as auth from '../../functions/auth';
import logo from '../../../public/logo.svg';
import './home.css';

function Home() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');

  useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div className="home">
      <Navbar expand="lg" className="d-flex align-items-center px-5">
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logo} alt="Golf ITS" width="45" height="45" className="d-inline-block align-text-center mx-2" />
          <span className='mt-1'>Golf ITS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto my-2">
            {isLoggedIn && (
              <NavDropdown title="Other" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/member-list">Member List</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav className="ms-2 align-items-center">
            <Nav.Link as={Link} to="/member-list">Events</Nav.Link>
            <Nav.Link as={Link} to="/member-list">News</Nav.Link>
            <Nav.Link as={Link} to="/member-list">About Us</Nav.Link>
            <Nav className="ms-2">
              {isLoggedIn ? (
                <NavDropdown title={<><img src={userProfilePicture} alt="" className="user-profile-image me-2" />{userName}</>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Button as={Link} to="/login" variant="outline-success">Login</Button>
                </Nav.Item>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      {/* Body */}


      {/* Footer */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#abc0c06c" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,240C480,235,600,213,720,181.3C840,149,960,107,1080,117.3C1200,128,1320,192,1380,224L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
      <footer className="footer py-3">
        <div className="container text-center">
          {/* Footer Content */}
          <p>Copyright &copy; 2023 Team PMO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
