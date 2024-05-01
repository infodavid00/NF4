import { useState } from 'react';
// import axios from 'axios';
import '../login/loginpage.scss';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // const handleSubmit = async (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('https://gp-ooo8.onrender.com/users/login', {
  //       email: email,
  //       password: password
  //     });
  //     const { token } = response.data;
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     localStorage.setItem('token', token);
  //     window.location.href = '/courses';
      
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     if (axios.isAxiosError(error) && error.response) {
  //       console.error('Error response:', error.response.data);
  //     }
  //   }
  // };

  return (
    <div className="login-container">
      {/* onSubmit={handleSubmit}  */}
      <form className="form-login">
        <h2>Register</h2>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
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
        <select id='reg-select' value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        </div> 

        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
