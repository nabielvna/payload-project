import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import logo from '../../../public/logo.svg';
import './login.css';
import { checkLoggedInStatus, loginUser, logoutUser } from '../../functions/auth';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
    checkLoggedInStatus(setLoggedIn, setUserName);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [userType, setUserType] = useState('staff');

  useEffect(() => {
    if (isLoggedIn) {
      setShowWelcome(true);
      const timeoutId = setTimeout(() => {
        setShowWelcome(false);
        navigate('/home');
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser(userType, email, password, setEmail, setPassword, setLoggedIn, setUserName);
  };

  const handleLogout = () => {
    logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div className="Login">
      <Navbar expand="lg" className="d-flex align-items-center px-5">
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logo}
            alt="Golf ITS"
            width="45"
            height="45"
            className="d-inline-block align-text-center mx-2"
          />
          <span className='mt-1'>
            Golf ITS
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/member-list">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/member-list">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/member-list">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="custom-login-form">
              <div className='text-center mb-3'>
                <h2>Login</h2>
              </div>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email-form" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email-form"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password-form" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-form"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user-type" className="form-label">
                    Login As:
                  </label>
                  <select
                    id="user-type"
                    className="form-select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="staff">Staff</option>
                    <option value="member">Member</option>
                  </select>
                </div>
                <div className='d-flex justify-content-end'>
                  <Button
                    type="submit"
                    variant="success"
                  >
                    Login
                  </Button>
                </div>
              </form>
              {showWelcome && (
                <div className="floating-object text-center d-flex">
                  <h2 className="my-auto mx-auto">Welcome <br></br>{userName}!</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
