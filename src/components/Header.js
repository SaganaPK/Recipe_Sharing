import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import logo from "../assets/logo.png";
import AdminAuthForm from "../pages/AdminAuthForm";

const Header = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="site-heading">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => setShowAuthForm(true)}
        />
      </div>

      {/* Desktop and Mobile Navigation */}
      <nav className={`nav ${isMobileNavOpen ? "mobile-nav open" : ""}`}>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link" onClick={closeMobileNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link" onClick={closeMobileNav}>
              About
            </Link>
          </li>
          <li className="recipes-dropdown">
            <Link to="/recipes" className="nav-link" onClick={closeMobileNav}>
              Recipes
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/recipes/breakfast"
                  className="dropdown-link"
                  onClick={closeMobileNav}
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes/lunch"
                  className="dropdown-link"
                  onClick={closeMobileNav}
                >
                  Lunch
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes/snack"
                  className="dropdown-link"
                  onClick={closeMobileNav}
                >
                  Snacks
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes/dessert"
                  className="dropdown-link"
                  onClick={closeMobileNav}
                >
                  Dessert
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes/instant recipes"
                  className="dropdown-link"
                  onClick={closeMobileNav}
                >
                  Instant Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes/trending"
                  className="dropdown-link"
                  onClick={closeMobileNav}
                >
                  Trending Recipes
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={closeMobileNav}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hamburger Button for Mobile */}
      <button
        className={`hamburger ${isMobileNavOpen ? "open" : ""}`}
        onClick={toggleMobileNav}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Show Admin Authentication Form */}
      {showAuthForm && <AdminAuthForm onClose={() => setShowAuthForm(false)} />}
    </header>
  );
};

export default Header;
