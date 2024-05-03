import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../base.tsx';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

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
          username: username,
          password: password,
          bio: bio,
          age: age,
          gender: gender,
          address: address,
        }),
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
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="addy">Address:</label>
          <input type="text" id="addy" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio:</label>
          <input type="text" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="gender">Gender:</label>
          <select id="reg-select" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-field">
          <Link to="/login">Login?</Link>
        </div>

        {email && username && password && password.length >= 6 && address && bio && age && gender && <button type="submit" className="login-button">Register</button>}
      </form>
    </div>
  );
};

export default RegisterPage;
