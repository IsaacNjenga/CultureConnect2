import React from "react";
import "../assests/css/about.css";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <p>
          This web application was made possible by the efforts of Celestine
          Gitau, Charity Nyamamba, and Isaac Njenga. We hope it satisfies your
          visit.
        </p>
      </div>
    </>
  );
}

export default About;
