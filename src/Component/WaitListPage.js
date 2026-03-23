import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const api = process.env.REACT_APP_API_URL;


const getSource = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("source") || "direct";
};

export default function WaitlistPage() {
  const [form, setForm] = useState({
    email: "",
    platform: "",
    missedDeals: "",
    monetise: "",
  });

  const [count, setCount] = useState(127);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fake growth effect for social proof
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

useEffect(() => {
  const source = getSource();

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit || now - lastVisit > 30 * 60 * 1000) {
    fetch(`${api}/track-visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source }),
    });

    localStorage.setItem("lastVisit", now);
  }
}, []);


 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true); // ✅ start loading immediately
  setSubmitted(false); // reset submitted state

  try {
const localHost = 'http://localhost:5000/api'
    const res = await axios.post(`${localHost}/create-waitlist`, form);

    // Show toast
    toast.success(res?.data?.msg || "Thanks for joining 🚀");

    // Mark as submitted
    if (res?.data) {
      setSubmitted(true);
    }
  } catch (err) {
    const message =
      err.response?.data?.msg || "Network error — check backend and CORS";
    toast.error(message);
  } finally {
    setLoading(false); // ✅ stop loading after success or error
  }
};
  return (
    <div className="container">
      {/* Animated DM background */}
      <div className="dm-bg">
        <div className="dm">Hey, check this out!</div>
        <div className="dm">Collab?</div>
        <div className="dm highlight">Brand deal opportunity</div>
        <div className="dm">Hi</div>
        <div className="dm">Available?</div>
      </div>

      <div className="card">
        {!submitted ? (
          <>
            <h1>Get paid for your attention. Filter the rest.</h1>
            <p>
              ClusterClear helps creators filter important messages and earn
              from priority access.
            </p>

            {/* Social proof */}
            <div className="social-proof">{count}+ creators already joined</div>

            <form>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <select name="platform" onChange={handleChange} required>
                <option value="">Where do you get most messages?</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>WhatsApp</option>
              </select>

              <select name="missedDeals" onChange={handleChange} required>
                <option value="">Do you miss deals due to too many DMs?</option>
                <option>Yes</option>
                <option>Sometimes</option>
                <option>No</option>
              </select>

              <select name="monetise" onChange={handleChange} required>
                <option value="">Would you earn from priority messages?</option>
                <option>Yes</option>
                <option>Maybe</option>
                <option>No</option>
              </select>

              <button onClick={handleSubmit} disabled={loading} type="submit">
                {loading ? "Submitting..." : "Get Early Access"}
              </button>
            </form>

            <span className="note">
              Early creators get priority access + monetisation features first.
            </span>
          </>
        ) : (
          <div className="success">
            <h2>Thanks for joining 🚀</h2>
            <p>You will be notified when we launch.</p>
          </div>
        )}
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0f0f0f;
          overflow: hidden;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 20px;
          position: relative;
        }

        .dm-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .dm {
          position: absolute;
          background: #2a2a2a;
          color: #aaa;
          padding: 10px 14px;
          border-radius: 20px;
          font-size: 12px;
          animation: float 10s linear infinite;
        }

        .highlight {
          background: #4f46e5;
          color: white;
        }

        .dm:nth-child(1) { top: 10%; left: 5%; }
        .dm:nth-child(2) { top: 30%; right: 10%; }
        .dm:nth-child(3) { top: 60%; left: 15%; }
        .dm:nth-child(4) { bottom: 20%; right: 5%; }
        .dm:nth-child(5) { bottom: 10%; left: 25%; }

        @keyframes float {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.3; }
        }

        .card {
          position: relative;
          z-index: 1;
          background: rgba(26,26,26,0.95);
          padding: 30px;
          border-radius: 16px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        h1 {
          font-size: 22px;
          color: white;
        }

        p {
          font-size: 14px;
          color: #aaa;
        }

        .social-proof {
          font-size: 13px;
          color: #4f46e5;
          margin: 10px 0 20px;
        }

        input, select {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          border: none;
          background: #2a2a2a;
          color: white;
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #4f46e5;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .note {
          display: block;
          margin-top: 15px;
          font-size: 12px;
          color: #777;
        }

        .success h2 {
          color: white;
        }

        .success p {
          color: #aaa;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
}
