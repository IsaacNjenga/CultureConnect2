import React from "react";
import Navbar from "../components/Navbar";
import "../assests/css/dashboard.css";
import { Outlet } from "react-router-dom";
import CategoriesBar from "../components/categoriesBar";
import Loader from "../components/loader";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <CategoriesBar />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
