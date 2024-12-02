import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Reset error messages on each login attempt
    setUsernameError('');
    setPasswordError('');

    // Basic validation
    if (!username) {
      setUsernameError('Username is required.');
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    // Check login credentials in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      // Login success
      localStorage.setItem('currentUser', JSON.stringify(user)); // Save the logged-in user
      navigate('/home', { state: { fromLogin: true } });  // Redirect to Home page
    } else {
      setPasswordError('Invalid username or password.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) setUsernameError('');  // Clear error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) setPasswordError('');  // Clear error when user starts typing
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button onClick={handleLogin}>Login</button>
        <p>
          New user?{' '}
          <button
            className="signup-link"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
