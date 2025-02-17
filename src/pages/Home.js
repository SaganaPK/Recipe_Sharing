import React, { useState, useEffect } from "react";
import TheFamilyCookBook from "../assets/TheFamilyCookBook.png";
import NewRecipesImage from "../assets/NewRecipesImage.jpeg"; // Placeholder for the second image
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import levenshtein from "fast-levenshtein"; 
import db from "../firebase";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [latestRecipes, setLatestRecipes] = useState([]); // For the latest 3 recipes
  const navigate = useNavigate();
  const [bestMatch, setBestMatch] = useState(null); // ✅ Add state for best match


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "RecipeList"));
        const fetchedRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort recipes by createdAt in descending order (newest first) and get the latest 3
        const sortedRecipes = fetchedRecipes
          .filter((recipe) => recipe.createdAt) // Ensure createdAt exists
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 3);

        setLatestRecipes(sortedRecipes); // Latest 3 recipes
       // sortedRecipes.forEach(recipe => console.log(recipe.name, recipe.createdAt));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setErrorMessage("Please enter a recipe name to search.");
      return;
    }
  
    try {
      const querySnapshot = await getDocs(collection(db, "RecipeList"));
      const recipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const searchLower = searchQuery.trim().toLowerCase();
  
      // **Exact match check**
      const matchedRecipe = recipes.find(
        (recipe) => recipe.name.toLowerCase() === searchLower
      );
  
      if (matchedRecipe) {
        setErrorMessage("");
        navigate(`/recipes/${matchedRecipe.type}/${matchedRecipe.id}`);
        return;
      }
  
      // **Fuzzy matching for suggestions**
      let bestMatch = null;
      let bestDistance = Infinity;
  
      recipes.forEach((recipe) => {
        const recipeName = recipe.name.toLowerCase();
        const distance = levenshtein.get(searchLower, recipeName); // Compare similarity
  
        if (distance < bestDistance && distance <= 3) { // Allow minor differences
          bestMatch = recipe;
          bestDistance = distance;
        }
       // console.log("Best Match:", bestMatch);
      });
  
      if (bestMatch) {
        setBestMatch(bestMatch); // ✅ Store the best match in state
        setErrorMessage(
          `Recipe not found. Did you mean "${bestMatch.name}"? Click here to view.`
        );
      } else {
        setBestMatch(null); // ✅ Reset bestMatch if no match found
        setErrorMessage("Recipe not found. Please try a different name.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setErrorMessage("An error occurred while searching. Please try again.");
    }
  };

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
    <div className="home-container">
      {/* Top Box */}
      <div className="centered-box">
        <img src={TheFamilyCookBook} alt="Site Name" className="centered-image1" />
        <div className="overlay-content">
          <p className="search-heading">
            Hungry to try something new? Search for your next dish!
          </p>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
          {errorMessage && (
  <p className="error-message">
    {errorMessage.includes("Did you mean") && bestMatch ? (
      <>
        Did you mean
        <span
          className="best-match"
          onClick={() => {
            if (bestMatch && bestMatch.type && bestMatch.id) {
              //console.log("Navigating to:", `/recipes/${bestMatch.type}/${bestMatch.id}`);
              navigate(`/recipes/${bestMatch.type}/${bestMatch.id}`);
            } else {
              console.warn("Best match is not ready yet!");
            }
          }}        >
          {" "}{bestMatch.name}?
        </span>
      </>
    ) : (
      errorMessage
    )}
  </p>
)}

        </div>
      </div>

      {/* Bottom Box */}
      <div className="centered-box">
        <img src={NewRecipesImage} alt="New Recipes" className="centered-image2" />
        <div className="overlay-content">
          <p className="recipe-heading">Try out our new recipes!</p>
          <div className="recipes-grid">
            {latestRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="homerecipe-card"
                onClick={() =>
                  navigate(`/recipes/${recipe.type}/${recipe.id}`)
                }
              >
                <img
                  src={getImagePath(recipe.name)}
                  alt={recipe.name}
                  className="homerecipe-image"
                />
                <p className="homerecipe-name">{recipe.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;