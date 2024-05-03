import { useState, useEffect } from 'react';
import './userprofile.scss'; // Assuming a separate or existing stylesheet
import { baseurl } from '../../base.tsx';

interface UserData {
  username: string;
  email: string;
  bio: string;
  profilePicture: string;
  age: string;
  gender: string;
  location: string;
}

const UserProfile = () => {
  // Extended user data example
  const [userData, setUserData] = useState<UserData>({
    username: 'loading...',
    email: 'loading...',
    bio: 'loading...',
    profilePicture: 'public/profile.svg', // Placeholder path
    age: 'loading...',
    gender: 'loading...',
    location: 'loading',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await fetch(`${baseurl}/users/info`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUserData({ ...userData, profilePicture: 'public/profile.svg' });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({
          username: 'error',
          email: 'error',
          bio: 'error',
          profilePicture: 'public/profile.svg',
          age: 'error',
          gender: 'error',
          location: 'error',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-container">
        <div className="profile-header">
          <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
          <h1>{userData.username}</h1>
          {/* <button onClick={handleEditProfile} className="edit-profile-btn">Edit Profile</button> */}
        </div>
        <div className="profile-info">
          <div className="info-section">
            <h2>Contact Information</h2>
            <p>Email: {userData.email}</p>
            {/* <p>Location: {userData.location}</p> */}
          </div>
          <div className="info-section">
            <h2>About</h2>
            <p>Bio: {userData.bio}</p>
            <p>Age: {userData.age}</p>
            <p>Gender: {userData.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
