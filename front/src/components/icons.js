import React from "react";
import architectureAndDesign from "../assests/icons/architecture and design.png";
import artsAndHandicrafts from "../assests/icons/arts and handicrafts.png";
import clothingAndFashion from "../assests/icons/clothing and fashion.png";
import customsAndTraditions from "../assests/icons/customs and traditions.png";
import etiquetteAndSocialNorms from "../assests/icons/etiquette and social norms.png";
import festivalsAndHolidays from "../assests/icons/festivals and holidays.png";
import filmAndTheatre from "../assests/icons/film and theatre.png";
import folkTalesAndLegends from "../assests/icons/folk tales and legends.png";
import foodAndCuisine from "../assests/icons/food and cuisine.png";
import languageAndCulture from "../assests/icons/language and culture.png";
import literatureAndPoetry from "../assests/icons/literature and poetry.png";
import musicAndDance from "../assests/icons/music and dance.png";
import religiousPracticesAndBeliefs from "../assests/icons/religious practices and beliefs.png";
import sportsAndGames from "../assests/icons/sports and games.png";
const getIconByCategory = (category) => {
  switch (category) {
    case "Architecture & Design":
      return <img src={architectureAndDesign} alt="Architecture and Design" />;
    case "Arts & Handicrafts":
      return <img src={artsAndHandicrafts} alt="Arts and Handicrafts" />;
    case "Clothing & Fashion":
      return <img src={clothingAndFashion} alt="Clothing and Fashion" />;
    case "Customs & Traditions":
      return <img src={customsAndTraditions} alt="Customs and Traditions" />;
    case "Etiquette & Social Norms":
      return (
        <img src={etiquetteAndSocialNorms} alt="Etiquette and Social Norms" />
      );
    case "Festivals & Holidays":
      return <img src={festivalsAndHolidays} alt="Festivals and Holidays" />;
    case "Films & Theatre":
      return <img src={filmAndTheatre} alt="Films and Theatre" />;
    case "Folk Tales & Legends":
      return <img src={folkTalesAndLegends} alt="Folk Tales and Legends" />;
    case "Food & Cuisine":
      return <img src={foodAndCuisine} alt="Food and Cuisine" />;
    case "Languages & Culture":
      return <img src={languageAndCulture} alt="Languages and Culture" />;
    case "Literature & Poetry":
      return <img src={literatureAndPoetry} alt="Literature and Poetry" />;
    case "Music & Dance":
      return <img src={musicAndDance} alt="Music and Dance" />;
    case "Religious Practices & Beliefs":
      return (
        <img
          src={religiousPracticesAndBeliefs}
          alt="Religious Practices and Beliefs"
        />
      );
    case "Sports & Games":
      return <img src={sportsAndGames} alt="Sports and Games" />;
    default:
      return null;
  }
};

const Icons = ({ category }) => {
  return <div>{getIconByCategory(category)}</div>;
};

export default Icons;
