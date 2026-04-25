// LoginPage.jsx
import React from "react";
import "../Styles/Login.css"; // make sure to create this CSS file for styling
import logo from "../Assest/newcluster.png"; 

import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../Redux/Asycthunk";


export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

const dispatch = useDispatch();



const handleLogin = async (e) => {
  e.preventDefault();
localStorage.setItem("lastActivity", Date.now());
  localStorage.setItem("email", email);

  try {

    if(!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await dispatch(
      loginUser({ email, password })
    ).unwrap();

    localStorage.setItem("token", result.token);

     toast.success("Login successful!");

     // Redirect based on onboarding stage
    const stage = result.user.onboardingStage;
   

    if (stage === "none") {
      window.location.href = "/onboarding-step-one";
      return;
    }

    if (stage === "step_two") {
      window.location.href = "/onboarding-step-two";
      return;
    }

    window.location.href = "/dashboard";
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Login failed. Please check your credentials."
    );
    console.error("Login error:", err);
  }
};
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
          <input type="email" placeholder="you@example.com" required
          value={email} onChange={(e) => setEmail(e.target.value)} />
         
          <label>Password</label>
          <input type="password" placeholder="********" required
          value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button  onClick={handleLogin} className="auth-btn">Log In</button>
        </form>

        <p className="switch-auth">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}