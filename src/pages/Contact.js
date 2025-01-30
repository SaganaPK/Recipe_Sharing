import React, { useState } from "react";
import  db  from "../firebase"; // Import your Firebase config file
import { collection, addDoc } from "firebase/firestore";
import "../css/Contact.css";

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "review"), {
        ...formData,
        rating: rating,
        timestamp: new Date(),
      });

      alert("Thank you for your feedback!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1 className="contact-heading">We'd Love to Hear from You!</h1>
        <p className="contact-warm-message">
          Whether you have questions about recipes, feedback, or just want to say
          hello, feel free to reach out. Your love and support keep us cooking!
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contactform-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contactform-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contactform-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contactform-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        <div className="feedback-section">
          <h2>Feedback</h2>
          <p>How would you rate your experience with our website?</p>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hover || rating) ? "filled" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                &#9733;
              </span>
            ))}
          </div>
          {rating > 0 && <p>Thank you for giving us {rating} stars!</p>}
        </div>

        <div className="contact-info">
          <h2>Other Ways to Contact Us</h2>
          <p>Email: support@familyrecipes.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>
            Follow us on:
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              {" "}
              Facebook
            </a>
            ,
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              {" "}
              Instagram
            </a>
            ,
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              {" "}
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
