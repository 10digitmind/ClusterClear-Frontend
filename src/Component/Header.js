// src/components/Header.jsx
import React from "react";
import  "../Styles/Header.css"; // make sure to create this CSS file for styling
import logo from "../Assest/newcluster.png"; // replace with your actual logo path
import { useState } from "react";
const Header = ({ isLoggedIn = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <a href="/">
          <img src={logo} alt="ClusterClear Logo" />
        </a>
      </div>

      {/* If user NOT logged in show navigation */}
      {!isLoggedIn && (
        <>
          <nav className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
            <a href="#how-it-works">How it Works</a>
            <a href="#about-us">About Us</a>
            <a href="#contact-us">Contact Us</a>

    
          </nav>

          <div className="auth-buttons">
            <a href="login">

           
            <button className="login">Login</button>
             </a>
             <a href="signup">

         
            <button className="signup">Sign Up</button>
                </a>
          </div>

          {/* Mobile controls */}
          <div className="mobile-header">
            <a href="signup">

         
            <button className="get-started">Get Started</button>
   </a>
            <div
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;;