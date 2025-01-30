import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { Link } from "react-router-dom";
import "../css/Recipes.css";

const Recipes = () => {
  const [recipesByType, setRecipesByType] = useState({});

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "RecipeList"));
        const recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Group recipes by type
        const groupedByType = recipes.reduce((acc, recipe) => {
          const type = recipe.type || "Others"; // Default to 'Others' if no type exists
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(recipe);
          return acc;
        }, {});

        setRecipesByType(groupedByType);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const getImagePath = (name) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "");
    return require(`../assets/dishes/${formattedName}.jpeg`);
  };

  return (
    <div className="recipe-container">
      {Object.entries(recipesByType).map(([type, recipes]) => (
        <div key={type} className="recipe-type-section">
          {/* Recipe Type Header */}
          <h2 className="recipe-type-title">{type}</h2>
          {/* Recipe Cards */}
          <div className="recipe-cards">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <Link to={`/recipes/${recipe.type}/${recipe.id}`} className="recipe-link">
                  <img
                    src={getImagePath(recipe.name)}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <h3 className="recipe-name">{recipe.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
