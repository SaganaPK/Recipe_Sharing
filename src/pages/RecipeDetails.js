import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import db from "../firebase";
import "../css/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  const handleMouseEnter = (index) => setUserRating(index + 1);
const handleMouseLeave = () => setUserRating(0);


  const handleClick = (index) => setUserRating(index + 1);

  useEffect(() => {
    const docRef = doc(db, "RecipeList", id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setRecipe(docSnap.data());
        setAverageRating(docSnap.data().averageRating || 0);
      } else {
        console.log("No such document found!");
      }
    }, (error) => {
      console.error("Error fetching recipe details:", error);
    });

    return () => unsubscribe();
  }, [id]);

  const handleRating = async () => {
    if (userRating < 1 || userRating > 5) {
      setRatingError("Please provide a rating between 1 and 5.");
      return;
    }
    setRatingError("");

    try {
      const docRef = doc(db, "RecipeList", id);

      const updatedRatings = [...(recipe.ratings || []), userRating];
      const newAverage = updatedRatings.reduce((acc, val) => acc + val, 0) / updatedRatings.length;

      await updateDoc(docRef, {
        ratings: updatedRatings,
        averageRating: newAverage,
      });

      setAverageRating(newAverage);
      alert("Rating submitted!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const getImagePath = (name) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "");
    return require(`../assets/dishes/${formattedName}.jpeg`);
  };

  const handleCommentChange = (e) => setUserComment(e.target.value);

  const handleSubmitComment = async () => {
    if (!userComment) return;
    try {
      const docRef = doc(db, "RecipeList", id);
      await updateDoc(docRef, {
        comments: arrayUnion(userComment),
      });
      setUserComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!recipe) return <div className="loading">Loading recipe details...</div>;

  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>

      {/* Display average rating using stars */}
<div className="average-rating">
  <div className="star-rating">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < Math.round(averageRating) ? "filled" : ""}`}
      >
        ★
      </span>
    ))}
  </div>
</div>


      <img src={getImagePath(recipe.name) || "../assets/placeholder.jpg"} alt={recipe.name} className="recipe-image" />
      <p><strong>Type:</strong> {recipe.type}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        )) : <li>No ingredients available.</li>}
      </ul>

      <p><strong>Instructions:</strong></p>
      <p>{recipe.instructions || "No instructions available."}</p>

      {/* Rating section */}
      <div className="user-rating-section">
        <label>Rate this recipe (1-5): </label>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`star ${index < userRating ? "filled" : ""}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleRating}>Submit Rating</button>
        {ratingError && <p className="error">{ratingError}</p>}
      </div>

      {/* Comment section */}
      <div className="user-comments">
        <label>Add a comment:</label>
        <textarea
          value={userComment}
          onChange={handleCommentChange}
          placeholder="Write your comments here..."
        />
        <button onClick={handleSubmitComment}>Submit Comment</button>
      </div>

      {/* Display all comments */}
      <div className="comments-section">
        <h3>Comments</h3>
        {recipe.comments && recipe.comments.length > 0 ? (
          recipe.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
