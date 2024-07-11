import React from "react";
import Navbar from "../components/Navbar";
import "../assests/css/homePage.css";
import { Link } from "react-router-dom";
function HomePage (){
    return (
        <>
        <Navbar />
        <div>
          <h1>Welcome to Culture Connect</h1>
          <h2>Bridging Cultures, Connecting Hearts</h2>
          <p className="home-description2">Start a <Link to="/dashboard">Conversation</Link></p>
          <p>
          Discover the heart and soul of diverse cultures from around the world right here on CultureConnect. Our platform is a vibrant space where people from all walks of life come together to share their unique cultural stories, traditions, and practices. Whether it's the rich culinary traditions of your community, the intricate designs of traditional attire, or the timeless customs and arts passed down through generations, CultureConnect is your stage to celebrate and preserve what makes your heritage special.
          At CultureConnect, we believe in the power of storytelling to bridge gaps and foster understanding. Our mission is to create an inclusive and engaging environment where you can document and discuss your cultural experiences. By connecting with others, you can explore a world of traditions and practices that shape our global tapestry.

Join us in our quest to safeguard the rich cultural and natural heritage of our communities. Share your stories, engage in lively discussions, and participate in events that highlight the beauty of our diverse world. Together, let's celebrate the legacy of our ancestors and ensure that these priceless cultural treasures are passed on to future generations.

Welcome to CultureConnect – where every story matters and every tradition is cherished. Start your journey today and be a part of a global movement to preserve and celebrate our world's cultural heritage, one story at a time.
          </p>
          {/* <div id="main-div">
            <div className="category"><a href="#"><p>Food</p></a></div>
            <div className="category"><a href="#"><p>Dowry</p></a></div>
            <div className="category"><a href="#"><p>Clothing</p></a></div>
            <div className="category"><a href="#"><p>Dances</p></a></div>
            <div className="category"><a href="#"><p>Burial Rituals</p></a></div>
            <div className="category"><a href="#"><p>Circumcision Rituals</p></a></div>
          </div> */}
        </div>
        </>    
      );
    };
    
export default HomePage;
    