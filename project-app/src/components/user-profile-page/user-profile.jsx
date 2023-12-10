import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import logo from '../../../public/logo.svg';
import * as auth from '../../functions/auth';

function UserProfile() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  useEffect (() => {
    if(!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div className="User-Profile">
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
    </div>
  );
}

export default UserProfile;
