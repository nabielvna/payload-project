import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../project-app/style.css'
import './css/login.css'

function Login() {
    useEffect(() => {
        document.title = "Login";
    }, []);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const handleLogin = async () => {
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
        const user = await resp.json();
        console.log(user);
        
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
      }
    };

    return (
        <>
            <div className="container mt-5 centered-form">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        {isLoggedIn ? (
                        <div className="text-center">
                            <h2 className="mb-4">Welcome, {email}!</h2>
                            <button className="btn btn-primary" onClick={handleLogout}>
                            Logout
                            </button>
                        </div>
                        ) : (
                        <div className="custom-login-form">
                            <div className='text-center mb-3'>
                            <h2>Login</h2>
                            </div>
                            <form>
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
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleLogin}
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
