import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../project-app/style.css';
import './css/login.css';

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Periksa status login saat komponen dimuat
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setLoggedIn(true);
      // Mengambil data pengguna dari localStorage dan mengatur userName
      const storedUserName = localStorage.getItem('userName');
      setUserName(storedUserName);

      // Fetch data pengguna menggunakan token
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        fetchUserData(authToken);
      }
    }
  }, []);

  const fetchUserData = (token) => {
    fetch("http://localhost:3000/api/staffs/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched User Data:', data);
        // Handle data pengguna sesuai kebutuhan
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3000/api/staffs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!resp.ok) {
        const errorMsg = (await resp.json())?.error[0].message;
        throw new Error(errorMsg);
      }

      const responseData = await resp.json();
      // Set nama pengguna
      const userName = responseData?.user?.name || responseData?.name;
      setUserName(userName);

      // Set token otentikasi dalam cookie
      document.cookie = `authToken=${responseData.token}; path=/`;

      // Simpan status login dan data pengguna dalam localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', userName);
      localStorage.setItem('authToken', responseData.token);

      setLoggedIn(true);

      // Fetch data pengguna menggunakan token setelah login
      fetchUserData(responseData.token);

    } catch (error) {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan saat login.');
    }
  };

  const handleLogout = () => {
    // Hapus token otentikasi, reset status login, dan hapus data pengguna dari localStorage
    document.cookie = "authToken=; path=/";
    setLoggedIn(false);
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
  };

  return (
    <>
      <div className="container mt-5 centered-form">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {isLoggedIn ? (
              <div className="text-center">
                <h2 className="mb-4">Welcome, {userName}!</h2>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
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
                  <div className='d-flex justify-content-end'>
                    <button
                      type="submit"
                      className="btn btn-success"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
