import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Simulate login logic (you would replace this with actual authentication)
  const authenticate = (e) => {
    e.preventDefault();
    
    // Replace this with your actual authentication check (e.g., API call)
    if (username === 'user' && password === 'pass') {
      localStorage.setItem('authenticated', 'true'); // Store authentication state
      navigate('/home'); // Redirect to the home page on successful login
    } else {
      setError('Invalid username or password'); // Show an error if login fails
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={authenticate}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
