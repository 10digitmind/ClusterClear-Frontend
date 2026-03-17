// LoginPage.jsx
import React from "react";
import "../Styles/Login.css"; // make sure to create this CSS file for styling
import logo from "../Assest/newcluster.png"; 
export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div className="logo-container">
             <a href="/">
               <img src={logo} alt="ClusterClear" className="logo" />
                    </a>
        </div>

        {/* Heading */}
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to access your creator dashboard</p>

        {/* Form */}
        <form className="auth-form">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />

          <label>Password</label>
          <input type="password" placeholder="********" required />

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn">Log In</button>
        </form>

        <p className="switch-auth">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}