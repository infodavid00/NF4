import React, { useState , useEffect} from 'react';
import "./userprofile.scss"; // Assuming a separate or existing stylesheet
import axios from 'axios';
import  { baseurl} from '../../base.jsx';

const UserProfile = () => { 
useEffect(() => {
  const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${baseurl}/users/info`, {
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           }
        });
       console.log(response.data);
       setUserData({profilePicture: "public/profile.svg",...response.data});
      } catch (error) {
        setUserData({});
      }
    };
    fetchData();
}, []);

  // Extended user data example
  const [userData, setUserData] = useState({
    username: "loading...",
    email: "loading...",
    bio: "loading...",
    profilePicture: "public/profile.svg", // Placeholder path
    age: "loading...",
    gender: "loading...",
    location: "loading",
  });

  // Handler for edit functionality (placeholder)
  // const handleEditProfile = () => {
  //   console.log("Edit Profile Clicked");
  // };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-container">
      <div className="profile-header">
        <img src={userData.profilePicture} alt="Profile" className="profile-picture"/>
        <h1>{userData.username ?? "error"}</h1>
        {/* <button onClick={handleEditProfile} className="edit-profile-btn">Edit Profile</button> */}
      </div>
      <div className="profile-info">
        <div className="info-section">
          <h2>Contact Information</h2>
          <p>Email: {userData.email ?? "error"}</p>
          <p>Location: {userData.address ?? "error"}</p>
        </div>
        <div className="info-section">
          <h2>About</h2>
          <p>Bio: {userData.bio ?? "error"}</p>
          <p>Age: {userData.age ?? "error"}</p>
          <p>Gender: {userData.gender ?? "error"}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;
