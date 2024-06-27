import React from "react";
import Navbar from "../components/Navbar";
import "../assests/css/home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <h1 className="home-title">CultureConnect</h1>
        <p className="home-description">
          Bridging Cultures, Connecting Hearts
        </p>
        <p className="home-description2">
          Start a <Link to="/dashboard">Conversation</Link>
        </p>
      </div>
    </>
  );
}

export default Home;
