// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './home';
import LoginPage from './login';
import logo from '../public/logo.svg';
import '../../project-app/style.css'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar bg-body-tertiary d-flex align-items-center">
          <div className="container-fluid">
            <Link to="/home" className="navbar-brand d-flex align-items-center">
              <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-center mx-2"></img>
              UKM Golf ITS
            </Link>
            <Link to="/login" className="navbar-brand">
              <button className="btn btn-outline-success" type="button">Login</button>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
