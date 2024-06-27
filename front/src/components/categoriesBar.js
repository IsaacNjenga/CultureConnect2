import React from "react";
import "../assests/css/dashboard.css";
import { Link } from "react-router-dom";

function CategoriesBar() {
  return (
    <div>
      <div>
        <div className="button-container">
          <Link to="/add-conversation" className="start-convo-link">
            Start A Conversation
          </Link>
          <Link to="/conversation" className="start-convo-link">
            View posts
          </Link>
          <Link to="/my-conversations" className="start-convo-link">
            View My Posts
          </Link>
        </div>
        <h3 className="dashboard-p">
          Explore the richness of diverse cultures by selecting a topic below
          and start your journey of discovery!
        </h3>
        <ul>
          <li>Food & Cuisine</li>
          <li>Clothing & Fashion</li>
          <li>Music & Dance</li>
          <li>Languages & Culture</li>
          <li>Festivals & Holidays</li>
          <li>Arts & Handicrafts</li>
          <li>Literature & Poetry</li>
          <li>Customs & Traditions</li>
          <li>Religious Practices & Beliefs</li>
          <li>Sports & Games</li>
          <li>Architecture & Design</li>
          <li>Films & Theatre</li>
          <li>Folk Tales & Legends</li>
          <li>Etiquette & Social Norms</li>
        </ul>
      </div>
    </div>
  );
}

export default CategoriesBar;
