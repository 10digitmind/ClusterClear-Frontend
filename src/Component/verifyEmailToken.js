import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../Styles/verifyemail.css'

const api = process.env.REACT_APP_API_URL;

export default function VerifyEmailToken() {
  const { token } = useParams();

  const [message, setMessage] = useState(
    "Verifying your email..."
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${api}/verify-email/${token}`
        );

        const status = res.data.status;
console.log(res)
        if (status === "verified") {
          setMessage("Email verified!");

          setTimeout(() => {
            window.location.href =
              "/onboarding-step-one";
          }, 500);
        }

        if (status === "already_verified") {
          setMessage(
            "Already verified. Redirecting..."
          );

          setTimeout(() => {
            window.location.href =
              "/login";
          }, 500);
        }
      } catch (err) {
        const status =
          err.response?.data?.status;
console.log(err.response?.data?.status)
        if (status === "Invalid or expired token") {
          setMessage("Invalid or expired token.");
        } else if (status === "expired") {
          setMessage("Link expired.");
        } else {
          setMessage("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1>Email Verification</h1>
        <p className="hint">{loading? 'verifying email...':message}</p>
      </div>
    </div>
  );
}