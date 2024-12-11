import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/signup.css"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    // Username validation: Minimum 3 characters
    if (!username || username.length < 3) {
      setUsernameError('Username must be at least 3 characters.');
      return;
    }

    // Password validation: Minimum 8 characters and at least one special character
    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('Password must contain at least one special character.');
      return;
    }

    // Confirm Password validation: Passwords must match
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((user) => user.username === username)) {
      setUsernameError('Username already exists. Please choose another.');
    } else {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccessMessage('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) setUsernameError(''); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) setPasswordError('');  
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value) setConfirmPasswordError('');  
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Sign Up</h2>
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
            disabled={!username}  // Disable password field until username is entered
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={!password}  // Disable confirm password until password is entered
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        </div>
        <button onClick={handleSignup}>Sign Up</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <p>
          Already have an account?{' '}
          <button
            className="login-link"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
