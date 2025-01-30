import React, { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";
import "../css/AuthForm.css"; // Optional for styling

const AdminAuthForm = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace "admin123" with your desired admin password
    const ADMIN_PASSWORD = "admin123";

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setErrorMessage("Invalid password. Please try again.");
    }
  };

  if (isAuthenticated) {
    // Render the Add Recipe form if authenticated
    return <AddRecipeForm onClose={onClose} />;
  }

  return (
    <div className="auth-form-overlay">
      <div className="auth-form-container">
        <h2>Admin Authentication</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">Authenticate</button>
          <button
            type="button"
            className="auth-cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AdminAuthForm;
