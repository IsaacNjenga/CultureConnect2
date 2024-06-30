import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../assests/css/conversation.css";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function AddConversation() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [values, setValues] = useState({});
  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const valueData = { ...values, author: user.name, image: image };
    axios
      .post("addConversation", valueData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Conversation Posted!", {
            position: "top-right",
            autoClose: 500,
          });
          navigate("/conversation");
        }
      })
      .catch((err) => {
        toast.error("Error while posting!", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(err);
      });
  };

  const categories = [
    "Food & Cuisine",
    "Clothing & Fashion",
    "Music & Dance",
    "Languages & Culture",
    "Festivals & Holidays",
    "Arts & Handicrafts",
    "Literature & Poetry",
    "Customs & Traditions",
    "Religious Practices & Beliefs",
    "Sports & Games",
    "Architecture & Design",
    "Films & Theatre",
    "Folk Tales & Legends",
    "Etiquette & Social Norms",
  ];

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
      alert("Error");
    };
  };

  const back = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="add-conversation">
        <form className="conversation-form" onSubmit={handleSubmit}>
          <label htmlFor="Category">Select a Category</label>
          <select name="category" onChange={handleChange}>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <label htmlFor="thoughts">Thoughts</label>
          <textarea
            id="thoughts"
            onChange={handleChange}
            name="thoughts"
            rows="10"
            cols="30"
          ></textarea>
          <label htmlFor="imageUpload">Upload Image:</label>
          <input
            id="imageUpload"
            accept="image/*"
            type="file"
            onChange={convertToBase64}
          />
          <label htmlFor="author">Author: {user.name}</label>

          <div className="button-container">
            <button className="submit-button" type="submit">
              Post
            </button>
            <button className="cancel-button" type="button" onClick={back}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddConversation;
