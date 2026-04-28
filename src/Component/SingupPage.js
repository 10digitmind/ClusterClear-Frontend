// SignupPage.jsx
import React from "react";
import "../Styles/Login.css"; // reuse login styles for signup
import logo from "../Assest/newcluster.png"; 
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const api = process.env.REACT_APP_API_URL;

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


const checks = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
};



  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");


    try {
      
      const { data } = await axios.post(
        `${api}/signup`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("email", email); // store email for later use in verification

      // Optional: store token if backend sends it
      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Signup successful! check your email for verification.");
      }

      // Optional redirect
      window.location.href = '/verify-email-info';

    } catch (err) {
      console.error("Signup error:", err.message, err.response?.data);
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">

        <div className="logo-container">
          <a href="/">
            <img src={logo} alt="ClusterClear" className="logo" />
          </a>
        </div>

        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">
          Join as a creator and start receiving priority messages that comes with earning
        </p>

        <form className="auth-form" onSubmit={handleSignup}>
          
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        <label>Password</label>

<div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="********"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ width: "100%", paddingRight: "40px" }}
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "0.9rem",
      color: "#555",
    }}
  >
    {showPassword ? "Hide" : "Show"}
  </span>
  
  <div style={{ marginTop: "10px", fontSize: "0.8rem" }}>
  <p style={{ color: checks.length ? "green" : "#999" }}>
    {checks.length ? "✔" : "•"} At least 8 characters
  </p>
  <p style={{ color: checks.uppercase ? "green" : "#999" }}>
    {checks.uppercase ? "✔" : "•"} One uppercase letter
  </p>
  <p style={{ color: checks.number ? "green" : "#999" }}>
    {checks.number ? "✔" : "•"} One number
  </p>
  <p style={{ color: checks.special ? "green" : "#999" }}>
    {checks.special ? "✔" : "•"} One special character
  </p>
</div>
</div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "10px", color: "#555" }}>
            {message}
          </p>
        )}

        <p className="switch-auth">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}