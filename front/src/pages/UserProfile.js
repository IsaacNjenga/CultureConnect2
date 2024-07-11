import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import "../assests/css/userProfile.css";
import Navbar from "../components/Navbar";
import defaultProfilePic from "../assests/css/defaultProfilePic.png";

function UserProfile() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(defaultProfilePic);
  const [bio, setBio] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  const tribesOfKenya = [
    "Kikuyu",
    "Luhya",
    "Kalenjin",
    "Luo",
    "Kamba",
    "Somali",
    "Kisii",
    "Mijikenda",
    "Maasai",
    "Taita",
    "Embu",
    "Meru",
    "Taveta",
    "Turkana",
    "Teso",
    "Ilchamus",
    "Samburu",
    "Rendille",
    "Borana",
    "Gabra",
    "Orma",
    "Pokot",
    "Njemps",
    "Sakuye",
    "Somali",
    "Galla",
    "Ndorobo",
    "Suba",
    "Ogiek",
    "El Molo",
    "Kuria",
    "Malakote",
    "Swahili",
    "Arabs",
    "Waat",
    "Nubians",
    "Boni",
    "Giriama",
    "Digo",
    "Taveta",
    "Bajuni",
    "Orma",
    "Burji",
    "Sakuye",
  ];

  useEffect(() => {
    if (user) {
      axios
        .get(`/profile/${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setProfile(response.data.user);
          setBio(response.data.user.bio);
          setEthnicity(response.data.user.ethnicity);
          if (response.data.user.image) {
            setProfilePicPreview(response.data.user.image);
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

  const handleEthnicityChange = (e) => {
    setEthnicity(e.target.value);
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("ethnicity", ethnicity);
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
                alt="Profile"
                className="profile-img"
              />
              <input type="file" onChange={handleProfilePicChange} />
            </div>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <div className="profile-ethnicity">
              <strong>Ethnicity:</strong>
              <select value={ethnicity} onChange={handleEthnicityChange}>
                {tribesOfKenya.map((tribe) => (
                  <option key={tribe} value={tribe}>
                    {tribe}
                  </option>
                ))}
              </select>
            </div>
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
