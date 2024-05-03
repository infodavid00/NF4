import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../base.tsx';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseurl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
       });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      window.location.href = '/login';
    } catch (error: any) {
      console.error('Registration failed:', error);
      const responseData: any = await error.response?.json();
      console.error('Error response:', responseData);
    }
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-field">
          <Link to="/login">Login?</Link>
        </div>

        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
