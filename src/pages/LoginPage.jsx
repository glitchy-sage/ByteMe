import React, { useState, useEffect } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission (authentication logic)
  const authenticate = (e) => {
    e.preventDefault();

    if (username === 'user' && password === 'pass') {
      localStorage.setItem('authenticated', 'true');
      window.location.href = '/login'; // Redirect to the home page
    } else {
      setError('Invalid username or password');
    }
  };

  useEffect(() => {
    createStarryBackground(); // Call the animation function after component mounts
  }, []);

  return (
    <div className="login-page">
      <canvas id="starryCanvas"></canvas> {/* Canvas for starry background */}
      <div className="login-container">
        <form onSubmit={authenticate} className="login-form">
          <h2 className="form-title">Login</h2>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
};

// Function to create the starry background animation
const createStarryBackground = () => {
  const canvas = document.getElementById('starryCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas to full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  const numStars = 150; // Number of stars

  // Star class to represent each star
  class Star {
    constructor() {
      // Randomly position each star
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.5 + 1; // Random star size
      this.vx = Math.random() * 0.2 - 0.1; // Horizontal speed
      this.vy = Math.random() * 0.2 - 0.1; // Vertical speed
      this.alpha = Math.random() * 0.5 + 0.5; // Random transparency
    }

    // Draw the star
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 255, ${this.alpha})`; // Blue star with alpha transparency
      ctx.fill();
      ctx.closePath();
    }

    // Update star position and reappear when out of bounds
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Reposition stars if they move off-screen
      if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
      if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;

      this.draw();
    }
  }

  // Create stars
  function createStars() {
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }
  }

  // Animate stars
  function animateStars() {
    // Clear canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update each star's position and draw
    stars.forEach(star => star.update());

    // Continue animation
    requestAnimationFrame(animateStars);
  }

  // Initialize stars and animation
  createStars();
  animateStars();
};

export default LoginPage;
