import { useState } from "react";
import axios from "axios";
import '../Styles/verifyemail.css'
const api = process.env.REACT_APP_API_URL;

export default function VerifyEmailInfo() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("email");

  const resendEmail = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${api}/resend-verification`,
        { email }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Failed to resend email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1>Check your email</h1>

        <p className="subtitle">
          We sent a verification link to:
        </p>

        <p className="email">{email}</p>

        <p className="hint">
          Click the link in your inbox or spam folder.
        </p>

    
        <button
          className="secondary-btn"
          onClick={resendEmail}
          disabled={loading}
        >
          {loading ? "Sending..." : "Resend email"}
        </button>

        {message && (
          <p className="message">{message}</p>
        )}
      </div>
    </div>
  );
}