import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/ResetPassword.css"; // create this CSS file for styling
import api from '../Component/Api'


export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return setMessage("All fields are required");
    }

    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);
      setMessage("");

    const res =  await api.post(`/reset-password/${token}`, {
        password,
      });

      console.log("Reset response:", res.data);
      setMessage("Password reset successful. Redirecting...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      console.error(err?.message || err);
      const status = err.response?.data?.status;

      if (status === "invalid" || status === "expired") {
        setMessage("Reset link is invalid or expired");
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-container">
      <form className="rp-card" onSubmit={handleSubmit}>
        <h2 className="rp-title">Reset Password</h2>

        <p className="rp-subtext">
          Enter your new password below
        </p>

    <div className="rp-input-group">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="New password"
    className="rp-input"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <span
    className="rp-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </span>
</div>

<div className="rp-input-group">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Confirm password"
    className="rp-input"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  <span
    className="rp-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </span>
</div>

        <button className="rp-button" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p className="rp-message">{message}</p>}
      </form>
    </div>
  );
}