import { Link } from "react-router-dom";

const CategoriesList = () => {
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
    <ul>
      {categories.map((category, index) => (
        <li key={index}>
          <Link to={`/categorie/${encodeURIComponent(category)}`}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
