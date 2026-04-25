import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

import { stepOne } from "../Redux/Asycthunk";
import AppHeader from "./AppHeader";
import api from "./Api";




export default function OnboardingStepOne() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(null);
// null | "checking" | true | false
const [message, setMessage] = useState("");

  const userEmail  = localStorage.getItem("email") || ""
  const name = userEmail.split("@")[0] || "User";



const dispatch = useDispatch();
  // username check
useEffect(() => {
  if (!username || username.length < 3) {
    setStatus(null);
    setMessage("");
    return;
  }

  const delay = setTimeout(async () => {
    try {
      setStatus("checking");
      setMessage("");

      const res = await api.get(
        `/check-username/${username}`
      );

      setStatus(res.data.available);
      setMessage(res.data.message || "");

    } catch (err) {
      setStatus(false);
      setMessage(
        err.response?.data?.message || "Error checking username"
      );
    }
  }, 500);

  return () => clearTimeout(delay);
}, [username]);

 const handleUsernameChange = (e) => {
  setUsername(e.target.value);
};
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }


 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

 
  try {
const res = await dispatch(
  stepOne({
    username,
    fullName,
    userType,
  })
);

    console.log("Response:", res);

    if (res.payload.message === 'Step one completed') {
      window.location.href = "/onboarding-step-two";
    }

  } catch (err) {
    console.log(err.message, err.response?.data);

  } finally {
    setLoading(false);
  }
};

  return (
        <>


              <AppHeader user={{ name: name }} onLogout={handleLogout} />

    <div className="onboarding-container">
      <div className="onboarding-card">

        <p className="progress">Step 1 of 2</p>

        <h2 className="title">Choose your identity</h2>

        <p className="subtitle">
          This helps us personalize your experience.
        </p>

        <form onSubmit={handleSubmit} className="form">

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="input"
          />

{status === "checking" && (
  <p className="hint">Checking availability...</p>
)}

{status === true && (
  <p className="success">Username available</p>
)}

{status === false && (
  <p className="error">
    {message || "Username not available"}
  </p>
)}


{username.length > 0 && username.length < 3 && (
  <p className="error">Username too short</p>
)}

          {/* FULL NAME */}
          <input
            type="text"
            placeholder="Full name (optional)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input"
          />

          {/* USER TYPE */}
          <div className="type-box">
            <button
              type="button"
              className={userType === "creator" ? "active" : ""}
              onClick={() => setUserType("creator")}
            >
              Creator
            </button>

            <button
              type="button"
              className={userType === "fan" ? "active" : ""}
              onClick={() => setUserType("fan")}
            >
              Fan
            </button>

          </div>

        <button
  className="primary-btn"
  disabled={
    loading ||
    !username ||
    username.length < 3 ||
    !userType ||
    status === "checking" ||
    status === false
  }
  type="submit"
>
  {loading ? "Loading..." : "Continue"}
</button>
        </form>
       
      </div>
  
  

      <style jsx>{`
        .onboarding-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f0f0f;
          color: white;
        }

        .onboarding-card {
          width: 100%;
          max-width: 420px;
          padding: 32px;
          background: #181818;
          border-radius: 20px;
        }

        .progress {
          font-size: 12px;
          opacity: 0.6;
        }

        .title {
          font-size: 24px;
          margin-top: 10px;
        }

        .subtitle {
          font-size: 14px;
          opacity: 0.7;
          margin-bottom: 20px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input {
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #222;
          color: white;
        }

        .type-box {
          display: flex;
          gap: 10px;
        }

        .type-box button {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: #222;
          color: white;
          cursor: pointer;
        }

        .type-box .active {
          background: #6355FE;
          color: white;
        }

        .primary-btn {
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #6355FE;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .success {
          color: lightgreen;
          font-size: 12px;
        }

        .error {
          color: red;
          font-size: 12px;
        }
      `}</style>
      
    </div>
       <footer className="app-footer">
      <p className="footer-text">
      © {new Date().getFullYear()} ClusterClear. All rights reserved.
      </p>
        </footer>
        </>
  );
}