import React, { useState } from 'react';
import './loginpage.scss';
import { Link } from 'react-router-dom';
import { baseurl } from '../../base.tsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseurl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      window.location.href = '/courses';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-login">
        <h2>Login</h2>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-field">
           <Link to="/register">Register?</Link>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
