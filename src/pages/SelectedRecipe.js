import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import db from "../firebase";
import { Link } from "react-router-dom";
import "../css/SelectedRecipe.css";

const SelectedRecipe = () => {
  const { type } = useParams(); // Get the type from the URL
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecipes = async () => {
      const lowerCaseType = type.toLowerCase();
        try {
          let fetchedRecipes = [];
          if (lowerCaseType === "trending") {
            // Fetch top 6 recipes based on highest rating and most recent creation
            console.log("Fetching trending recipes...");
            const q = query(
              collection(db, "RecipeList"),
              orderBy("averageRating", "desc"),
              orderBy("createdAt", "desc"),
              limit(6)
            );
            const querySnapshot = await getDocs(q);
            fetchedRecipes = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
          } else {
            // Fetch recipes based on their type (e.g., breakfast/snacks)
            console.log(`Fetching recipes for type: ${lowerCaseType}`);
            const q = query(collection(db, "RecipeList"));
            const querySnapshot = await getDocs(q);
            fetchedRecipes = querySnapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter((recipe) => recipe.type.toLowerCase() === lowerCaseType); // Client-side filtering
          }

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [type]);

  const getImagePath = (recipeName) => {
    try {
      // Convert recipe name to lowercase, remove spaces, and add .jpeg
      const formattedName = recipeName.toLowerCase().replace(/\s+/g, "");
      return require(`../assets/dishes/${formattedName}.jpeg`);
    } catch (err) {
      console.warn(`Image not found for ${recipeName}`);
      return require("../assets/dishes/placeholder.jpeg"); // Fallback to a placeholder image
    }
  };

  return (
    <div className="selected-recipe">
      <h1 className="recipe-title">
        {type.charAt(0).toUpperCase() + type.slice(1)} Recipes
      </h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : recipes.length > 0 ? (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div className="selectedrecipe-card" key={recipe.id}>
              <Link to={`/recipes/${recipe.type}/${recipe.id}`} className="recipe-link">
              <img
                src={getImagePath(recipe.name)}
                alt={recipe.name}
                className="selectedrecipe-image"
                onError={(e) => {
                  e.target.src = "/assets/dishes/placeholder.jpeg"; // Fallback image
                }}
              />
              <h3 className="selectedrecipe-name">{recipe.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recipes-message">No recipes found for {type}.</p>
      )}
    </div>
  );
};

export default SelectedRecipe;
