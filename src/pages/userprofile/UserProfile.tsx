import React, { useState } from 'react';
import "./userprofile.scss"; // Assuming a separate or existing stylesheet

const UserProfile = () => {
  // Extended user data example
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Experienced software developer with a passion for building scalable web applications.",
    profilePicture: "public/profile.svg", // Placeholder path
    age: 30,
    gender: "Female",
    location: "San Francisco, CA",
  });

  // Handler for edit functionality (placeholder)
  const handleEditProfile = () => {
    console.log("Edit Profile Clicked");
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-container">
      <div className="profile-header">
        <img src={userData.profilePicture} alt="Profile" className="profile-picture"/>
        <h1>{userData.name}</h1>
        <button onClick={handleEditProfile} className="edit-profile-btn">Edit Profile</button>
      </div>
      <div className="profile-info">
        <div className="info-section">
          <h2>Contact Information</h2>
          <p>Email: {userData.email}</p>
          <p>Location: {userData.location}</p>
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
