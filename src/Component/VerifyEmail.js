import { useEffect, useState } from "react";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;


export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");
 const [invalidVerification, setInvalidVerification] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

  const email = localStorage.getItem("email"); // store after signup
const resendEmail = async () => {
  setLoading(true);

  try {
    const res = await axios.post(`${api}/resend-verification`, { email });

    setMessage(res.data.message || "Verification email sent again.");

  } catch (err) {
    const msg =
      err.response?.data?.message || "Failed to resend email.";

    setMessage(msg);
  } finally {
    setLoading(false);
  }
};


 // auto polling (lightweight)
  useEffect(() => {
    if (!token || invalidVerification) return;

    checkVerification();

    const interval = setInterval(checkVerification, 5000);

    return () => clearInterval(interval);
  }, );

const checkVerification = async () => {
  setChecking(true);

  try {
    const res = await axios.get(`${api}/verify-email/${token}`);

    const status = res.data.status;
    

    localStorage.setItem("userOnboardingStage", res.data.user); // cleanup

    if (status === "verified") {
      setMessage("Email verified! Redirecting...");
      setTimeout(() => {
        window.location.href = "/onboarding-step-one";
      }, 500);
    }

  } catch (err) {
    const status = err.response?.data?.status;

    if (status === "already_verified") {
      setMessage("Already verified! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } 
    
    else if (status === "invalid") {
      setMessage("Invalid or expired link.");
     setInvalidVerification(true); // ✅
    }

    else {
      setMessage("Something went wrong.");
    }
  } finally {
    setChecking(false);
  }
};
 

  return (
   <div className="verify-container">
      <div className="verify-card">

        {!token ? (
          <>
            <h1>Check your email</h1>

            <p className="subtitle">
              We sent a verification link to:
            </p>

            <p className="email">{email || "your email"}</p>

            <p className="hint">
              Click the link in your inbox or spam folder.
            </p>

            <button
              className="primary-btn"
              onClick={checkVerification}
              disabled={checking}
            >
              I’ve verified my email
            </button>

            <button
              className="secondary-btn"
              onClick={resendEmail}
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend email"}
            </button>
          </>
        ) : (
          <>
            <h1>Verifying your email...</h1>
            <p className="hint">
              {checking ? "Please wait..." : message}
            </p>
          </>
        )}

        {message && !token && <p className="message">{message}</p>}

      </div>
    

      <style jsx>{`
        .verify-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f0f0f;
          color: white;
          padding: 20px;
        }

        .verify-card {
          width: 100%;
          max-width: 420px;
          background: #181818;
          padding: 32px;
          border-radius: 20px;
          text-align: center;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.7;
        }

        .email {
          font-size: 16px;
          font-weight: bold;
          margin: 10px 0;
          color: #6355ff;
        }

        .hint {
          font-size: 13px;
          opacity: 0.6;
          margin-bottom: 20px;
        }

        .primary-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: white;
          color: black;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 10px;
        }

        .secondary-btn {
          width: 100%;
          padding: 10px;
          border: none;
          background: transparent;
          color: #aaa;
          cursor: pointer;
        }

        .message {
          margin-top: 15px;
          font-size: 12px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
