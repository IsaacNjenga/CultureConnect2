import React from "react";
import "../assests/css/dashboard.css";
import { Link } from "react-router-dom";
import Icons from "./icons";

function CategoriesBar() {
  const categories = [
    "Food & Cuisine",
    "Clothing & Fashion",
    "Music & Dance",
    "Languages & Culture",
    "Festivals & Holidays",
    "Arts & Handicrafts",
    "Literature & Poetry",
    "Customs & Traditions",
    "Religious Practices & Beliefs",
    "Sports & Games",
    "Architecture & Design",
    "Films & Theatre",
    "Folk Tales & Legends",
    "Etiquette & Social Norms",
  ];

  return (
    <div>
      <br /> <br /> <br />
      <div className="button-container">
        <Link to="/add-conversation" className="start-convo-link">
          Start A Conversation
        </Link>
        <Link to="/conversation" className="start-convo-link">
          View posts
        </Link>
        <Link to="/my-conversations" className="start-convo-link">
          My Posts
        </Link>
      </div>
      <h3 className="dashboard-p">
        Explore the richness of diverse cultures by selecting a topic below and
        start your journey of discovery!
      </h3>
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <Link
              to={`/category/${encodeURIComponent(category)}`}
              style={{
                color: "white",
                textDecoration: "none",
                ":hover": {
                  color: "black",
                  textDecoration: "none",
                },
              }}
            >
              <div className="category-header">
                <Icons category={category} />
                {category}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesBar;
