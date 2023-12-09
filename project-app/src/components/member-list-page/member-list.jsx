import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../../functions/auth';
import logo from '../../../public/logo.svg';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/members?sort=name');
        const data = await response.json();

        if (data.docs && Array.isArray(data.docs)) {
          setMembers(data.docs);
        } else {
          console.error('Fetched data does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    auth.checkLoggedInStatus(setLoggedIn, setUserName);
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div>
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
          <Link to="/member-list" className="nav-link ms-2 active">
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
      <h1>Daftar Member</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Link to={`/members/${member.id}`}>
              {member.profilePicture && (
                <img
                  src={`http://localhost:3000${member.profilePicture.url}`} // sesuaikan dengan URL gambar
                  alt={`Profil ${member.name}`}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
              )}
              {member.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
