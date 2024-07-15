import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import "../assests/css/userProfile.css";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import defaultProfilePic from "../assests/css/defaultProfilePic.png";

function UserDetails() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    bio: "",
    ethnicity: "",
    email: "",
    username: "",
  });
  const [profilePicPreview, setProfilePicPreview] = useState(defaultProfilePic);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(`profile/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const profileData = response.data.profile;
      console.log(profileData);
      if (profileData) {
        setValues({
          firstname: profileData.firstname,
          lastname: profileData.lastname,
          gender: profileData.gender,
          bio: profileData.bio,
          ethnicity: profileData.ethnicity,
          email: profileData.email,
          username: profileData.username,
        });
        if (profileData.image) {
          setProfilePicPreview(profileData.image);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile data", { position: "top-right" });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id, fetchProfile]);

  if (!user) {
    return <p>Please log in to view profiles</p>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-heading">User Profile</h2>
        <div className="profile-details">
          <div className="profile-picture">
            <img
              src={profilePicPreview}
              alt="Profile"
              className="profile-img"
            />
            <input type="file" name="image" readOnly />
          </div>
          <div>
            <p>Username: {values.username}</p>
            <p>E-mail: {values.email}</p>
            <p>First Name:{values.firstname}</p>
            <p>Last Name:{values.lastname}</p>
            <p>Gender:{values.gender}</p>
            <p>Ethnicity:{values.ethnicity}</p>
            <p>Bio:{values.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
