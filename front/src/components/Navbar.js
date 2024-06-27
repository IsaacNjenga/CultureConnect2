import React from "react";
import { Link } from "react-router-dom";
import "../assests/css/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link className="navbar-brand">CultureConnect</Link>
      </div>
      <div className="navbar-right">
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>
        <Link to="/register" className="navbar-link">
          Register
        </Link>
        <Link to="/login" className="navbar-link">
          Login
        </Link>
        <Link to="/logout" className="navbar-link">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
