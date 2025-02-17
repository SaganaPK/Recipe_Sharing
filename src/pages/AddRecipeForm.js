import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Import serverTimestamp
import db from "../firebase";
import "../css/AddRecipeForm.css";

const AddRecipeForm = ({ onClose }) => {
  const [recipe, setRecipe] = useState({
    name: "",
    type: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert ingredients to an array
    const ingredientsArray = recipe.ingredients
      .split(",")
      .map((item) => item.trim()) // Trim whitespace
      .filter((item) => item); // Remove empty strings

    const recipeData = {
      ...recipe,
      ingredients: ingredientsArray, // Store ingredients as an array
      instructions: recipe.instructions.replace(/\r\n/g, "\n"), // Normalize new lines
      createdAt: serverTimestamp(), // Add timestamp
    };

    try {
      console.log("Recipe Data before adding to Firestore:", recipeData); // Debugging
      await addDoc(collection(db, "RecipeList"), recipeData);
      alert("Recipe added successfully!");
      console.log("Recipe added successfully!");
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="full-page-form">
      <div className="form-header">
        <h2>Add New Recipe</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter recipe name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Recipe Type</label>
          <select
            id="type"
            name="type"
            value={recipe.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Instant Recipes">Instant Recipes</option>
            <option value="Trending Recipes">Trending Recipes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            placeholder="Enter ingredients (comma-separated)"
            value={recipe.ingredients}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Enter detailed instructions"
            value={recipe.instructions}
            onChange={handleChange}
            rows="8"
            required
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
