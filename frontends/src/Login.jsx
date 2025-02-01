import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import picture3 from './assets/Houselogo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await response.json();
      if (!data.success) {
        if (data.message === 'Email (or adminID) not found!') {
          alert('Email (or adminID) not registered!');
        } else {
          alert('Incorrect password!');
        }
        return;
      }

      if (data.success) { 
        if (data.isAdmin) {
          navigate("/adminprofile", { state: { adminID: data.email } });  
        } else {
          navigate("/profile", { state: { email: data.email } });   
        }
      }
      
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <h1>STAFF QUARTERS PORTAL</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">USERNAME:</label>
            <input
              type="email"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">PASSWORD:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-buttonlogin">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
