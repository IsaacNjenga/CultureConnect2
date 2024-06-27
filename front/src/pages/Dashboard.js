import React from "react";
import Navbar from "../components/Navbar";
import "../assests/css/dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <p style = {{color:"white"}}>Content and conversation pods will soon be here!</p>
      </div>
    </>
  );
}

export default Dashboard;
