import { useState } from "react";
import axios from "axios";
import "../Styles/ForgotPassword.css"; // create this CSS file for styling
import Header from "./Header";
import Footer from "./Footer";

const api = process.env.REACT_APP_API_URL || "http://localhost:5000"; // fallback to localhost

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(`${api}/forgot-password`, { email });

      setMessage("Reset link sent to your email");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to send reset link"
      );
    }
      
 finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
   
    <div className="fp-container">
      <form className="fp-card" onSubmit={handleSubmit}>
        <h2 className="fp-title">Forgot Password</h2>

        <p className="fp-subtext">
          Enter your email and we’ll send you a reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="fp-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="fp-button" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p className="fp-message">{message}</p>}
      </form>
    </div>
    <Footer/>
       </>
  );
}