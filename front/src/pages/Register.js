import React, { useState } from "react";
import "../assests/css/form.css";
import { Link } from "react-router-dom";
import Validation from "../components/validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState("");
  const [serverErrors, setServerErrors] = useState([]);

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = Validation(values);
    setErrors(errs);
    if (errs.name === "" && errs.email === "" && errs.password === "") {
      const valueData = { ...values, image: image };
      axios
        .post("register", valueData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Success!", {
              position: "top-right",
              autoClose: 5000,
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
  };

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

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            autoComplete="off"
            placeholder="E-mail Address"
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label htmlFor="name" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label htmlFor="ethnicity" className="form-label">
            Ethnicity:
          </label>
          <select
            className="form-control"
            name="ethnicity"
            onChange={handleChange}
          >
            <option value="">Select your ethnicity</option>
            {tribesOfKenya.map((tribe, index) => (
              <option key={index} value={tribe}>
                {tribe}
              </option>
            ))}
          </select>
          {errors.ethnicity && (
            <span className="error">{errors.ethnicity}</span>
          )}
        </div>

        {serverErrors.length > 0 &&
          serverErrors.map((error, index) => (
            <p className="error" key={index}>
              {error.msg}
            </p>
          ))}
        <button className="form-btn">Sign up!</button>
        <p>
          <label htmlFor="proflie-pic">Profile Pic</label>
          <input
            id="imageUpload"
            accept="image/*"
            type="file"
            onChange={convertToBase64}
          />
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
