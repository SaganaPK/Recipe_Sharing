import React from 'react';
import '../css/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-header">
          <h1>Welcome to The Family Cookbook</h1>
          <p className="sub-heading">
            A collection of recipes, memories, and love from our family to yours
          </p>
        </div>

        <div className="about-content">
          <p>
            Welcome to <strong>The Family Cookbook</strong> – a collection of cherished recipes passed down through
            generations, prepared with love, and shared with passion. This website is a tribute to the kitchen traditions
            of our family, where each recipe tells a story, carries a memory, and reflects the flavors of our everyday lives.
          </p>

          <p>
            Our family – me, my mom, and my mother-in-law – have always loved cooking and sharing our culinary creations.
            Whether it's a comforting dish to enjoy together or a special recipe for a celebration, we believe food has
            the power to bring people together. Through this website, we hope to inspire others to explore new recipes,
            rekindle old family favorites, and discover the joy of cooking with loved ones.
          </p>

          <p>
            Each recipe here is a piece of our hearts. From traditional family meals to modern-day twists, every dish we
            share is something we’ve made with care. We hope you find something that brings joy to your kitchen and your
            table.
          </p>

          <p className="call-to-action">
            Join us in our cooking journey and feel the warmth and love that comes with every dish we create. Happy
            cooking!
          </p>
        </div>

        <div className="about-footer">
          <p>Follow us on our cooking journey!</p>
          <div className="social-icons">
            <span className="icon">🍴</span>
            <span className="icon">👩‍🍳</span>
            <span className="icon">📸</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
