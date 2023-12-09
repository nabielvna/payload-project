import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home-page/home';
import LoginPage from './components/login-page/login';
import UserProfilePage from './components/user-profile-page/user-profile'
import MemberList from './components/member-list-page/member-list';
import '../../project-app/style.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  const handleLogout = () => {
    // Tambahkan logika logout Anda di sini
  };

  return (
    <Router>
      <Routes>
        {/* Gunakan prop index untuk menentukan rute beranda */}
        <Route index element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/profile" element={<UserProfilePage />} /> 
        <Route path="/member-list" element={<MemberList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
