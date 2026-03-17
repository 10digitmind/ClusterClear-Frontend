// SignupPage.jsx
import React from "react";
import "../Styles/Login.css"; // reuse login styles for signup
import logo from "../Assest/newcluster.png"; 

export default function SignupPage() {
  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        {/* Logo */}
        <div className="logo-container">
          <a href="/">
       <img src={logo} alt="ClusterClear" className="logo" />
            </a>
        </div>

        {/* Heading */}
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join as a creator and start receiving priority messages that comes with earning</p>

        {/* Form */}
        <form className="auth-form">
       

          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />

          <label>Password</label>
          <input type="password" placeholder="********" required />

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="switch-auth">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}