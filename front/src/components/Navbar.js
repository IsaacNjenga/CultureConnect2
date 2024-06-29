import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../assests/css/navbar.css";
import { UserContext } from "../App";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          CultureConnect
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/about" className="navbar-link">
          About
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="navbar-link">
              {user.name}
            </Link>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
            <Link to="/logout" className="navbar-link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="navbar-link">
              Register
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
