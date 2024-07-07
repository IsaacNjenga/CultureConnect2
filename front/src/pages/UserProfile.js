import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import "../assests/css/userProfile.css";
import Navbar from "../components/Navbar";
import defaultProfilePic from "../assests/css/defaultProfilePic.png"

function UserProfile() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(defaultProfilePic);
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`/profile/${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setProfile(response.data.user);
          setBio(response.data.user.bio);
          if (response.data.user.profilePic) {
            setProfilePicPreview(response.data.user.profilePic);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data", error);
        });
    }
  }, [user]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("bio", bio);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    axios
      .post(`/profile/${user._id}/update`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setProfile(response.data.user);
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile", error);
      });
  };

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-heading">User Profile</h2>
        {profile ? (
          <div className="profile-details">
            <div className="profile-picture">
              <img
                src={profilePicPreview}
                // alt="Profile"
                className="profile-img"
              />
              <input type="file" onChange={handleProfilePicChange} />
            </div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <div className="profile-bio">
              <strong>Bio:</strong>
              <textarea value={bio} onChange={handleBioChange} />
            </div>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </>
  );
}

export default UserProfile;
