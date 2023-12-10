import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import * as auth from '../../functions/auth';
import logo from '../../../public/logo.svg';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await fetch('http://localhost:3000/api/members?sort=name');
        const membersData = await membersResponse.json();

        if (membersData.docs && Array.isArray(membersData.docs)) {
          setMembers(membersData.docs);
        } else {
          console.error('Fetched data does not contain an array:', membersData);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchData();
  }, []); 

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
    navigate('/login');
  };

  return (
    <div className='member-list'>
      {/* nav */}
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
            {isLoggedIn && (
              <NavDropdown title="Other" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/member-list">Member List</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav className="ms-2">
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
        </Navbar.Collapse>
      </Navbar>
      
      {/*list*/}
      <div className="container">
        <div className="d-flex flex-column align-items-center">
          <h1 className="my-5">Daftar Member</h1>
          {members.map((member) => (
            <div key={member.id} className="col-md-6 mb-4">
              <div className="card d-flex flex-row">
                <img
                  src={`http://localhost:3000${member.profilePicture.url}`}
                  alt={`Profil ${member.name}`}
                  className="card-img-left ms-3 rounded-circle align-self-center"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body ml-3 my-0 ">
                  <div className="justify-content-between align-items-start">
                    <h5 className="card-title">{member.name} <br /> {member.nickname} </h5>
                    <p className="card-text mt-0 pt-0">
                      <br></br>
                      NRP: {member.nrp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberList;
