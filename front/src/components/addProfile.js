import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assests/css/userProfile.css";
import { toast } from "react-toastify";
import defaultProfilePic from "../assests/css/defaultProfilePic.png";
import Loader from "./loader";

function AddProfile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState(defaultProfilePic);

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
    "Turkana",
    "Teso",
    "Ilchamus",
    "Samburu",
    "Rendille",
    "Borana",
    "Gabra",
    "Pokot",
    "Njemps",
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value || e.target.id });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const valuesData = {
      ...values,
      image: image,
      email: user.email,
      username: user.name,
    };
    axios
      .post("create-profile", valuesData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success("Profile Saved!", {
            position: "top-right",
            autoClose: 500,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error while saving!", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const base64Image = await convertFileToBase64(file);
      setImage(base64Image);
    } catch (error) {
      console.error("Error converting image file:", error);
      toast.error("Error uploading image file", { position: "top-right" });
    }
  };

  if (!user) {
    return <p>Please log in to view your profile</p>;
  }

  return (
    <>
      {loading && <Loader />}
      <div className="profile-container">
        <h2 className="profile-heading">User Profile</h2>

        <div className="profile-details">
          <div className="profile-picture">
            <img
              src={profilePicPreview}
              alt="Profile"
              className="profile-img"
            />
            <input type="file" onChange={handleImageUpload} name="image" />
          </div>
          <div>
            <p>Username: {user.name}</p>
            <p>E-mail: {user.email}</p>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              onChange={handleChange}
              name="firstname"
              placeholder="Enter your first name"
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              onChange={handleChange}
              name="lastname"
              placeholder="Enter your last name"
            />
            <div className="gender-options">
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  onChange={handleChange}
                  className="form-radio"
                />
                <label htmlFor="male" className="form-radio-label">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  onChange={handleChange}
                  className="form-radio"
                />
                <label htmlFor="female" className="form-radio-label">
                  Female
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="profile-ethnicity">
            <strong>Ethnicity:</strong>
            <select name="ethnicity" onChange={handleChange}>
              <option value="">Select Ethnicity</option>
              {tribesOfKenya.map((tribe) => (
                <option key={tribe} value={tribe}>
                  {tribe}
                </option>
              ))}
            </select>
          </div>
          <div className="profile-bio">
            <strong>Bio:</strong>
            <textarea name="bio" onChange={handleChange} />
          </div>
          <button onClick={handleSubmit}>Save Your Profile</button>
        </div>
      </div>
    </>
  );
}

export default AddProfile;
