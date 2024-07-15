import React from "react";
import Navbar from "../components/Navbar";
import "../assests/css/homePage.css";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <Navbar />
      <div>
        <h1>Welcome to Culture Connect</h1>
        <h2>Bridging Cultures, Connecting Hearts</h2>
        <p className="home-description2">
          Start a <Link to="/dashboard">Conversation</Link>
        </p>        
      </div>
    </>
  );
}

export default HomePage;
