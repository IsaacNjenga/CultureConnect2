import React from "react";
const getCategoryColor = (category) => {
  switch (category) {
    case "Architecture & Design":
      return "#f39c12"; // Orange
    case "Arts & Handicrafts":
      return "#9b59b6"; // Purple
    case "Clothing & Fashion":
      return "#3498db"; // Blue
    case "Customs & Traditions":
      return "#e74c3c"; // Red
    case "Etiquette & Social Norms":
      return "#27ae60"; // Green
    case "Festivals & Holidays":
      return "#e67e22"; // Carrot
    case "Films & Theatre":
      return "#16a085"; // Green Sea
    case "Folk Tales & Legends":
      return "#2c3e50"; // Midnight Blue
    case "Food & Cuisine":
      return "#1abc9c"; // Turquoise
    case "Languages & Culture":
      return "#f1c40f"; // Sunflower
    case "Literature & Poetry":
      return "#3498db"; // Blue
    case "Music & Dance":
      return "#f39c12"; // Orange
    case "Religious Practices & Beliefs":
      return "#9b59b6"; // Purple
    case "Sports & Games":
      return "#27ae60"; // Green
    default:
      return "#34495e"; // Wet Asphalt
  }
};

const CategoryColor = ({ category }) => {
  const color = getCategoryColor(category);

  return (
    <div
    className="category-color"
    style={{
      backgroundColor: color,
    }}
  ></div>
  );
};

export default CategoryColor;
