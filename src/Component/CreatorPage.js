import React from "react";
import "../Styles/Creator.css"; // Make sure to create this CSS file for styling
import { BsPatchCheckFill,BsLockFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../Component/Api"; // your axios instance
export default function CreatorPage() {

   const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { username } = useParams();
  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/creator/${username}`);

        setCreator(res.data.creator);

      } catch (err) {
        setError(
          err.response?.data?.message || "Creator not found"
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchCreator();
    }
  }, [username]);

  const hasStats =
  creator?.totalRequests >= 5;

  if (loading) {
    return (
      <div className="creator-wrapper">
        <div className="creator-card">
          <p>Loading creator...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="creator-wrapper">
        <div className="creator-card">
          <p>{error}</p>
        </div>
      </div>
    );
  }

return (
  <div className="creator-wrapper">
    <div className="creator-card">

      {/* HERO */}
      <div className="creator-hero-public">

        <img
          src={creator?.profilePic}
          alt={creator?.username}
          className="avatar"
        />

        <div className="creator-meta">
          <h1 className="username">
            @{creator?.username}

            {creator?.isEmailVerified && (
              <BsPatchCheckFill className="verified" />
            )}
          </h1>

          <p className="bio">
            {creator?.bio || "Available for priority messages and business enquiries."}
          </p>

          <span className="availability">
            ● Usually replies quickly
          </span>
        </div>
      </div>

      {/* VALUE POINTS */}
     {hasStats?<div className="highlights">
  <div className="highlight-box">
    <strong>{creator.responseRate}%</strong>
    <span>Response Rate</span>
  </div>

  <div className="highlight-box">
    <strong>{creator.averageResponseTime || "—"}</strong>
    <span>Avg Response</span>
  </div>

  <div className="highlight-box">
    <strong>{creator.totalResponded}</strong>
    <span>Responded</span>
  </div>
</div>: <div className="highlights">
        <div className="highlight-box">
          <strong>Fast</strong>
          <span>Priority inbox</span>
        </div>

        <div className="highlight-box">
          <strong>Direct</strong>
          <span>Reach creator directly</span>
        </div>

        <div className="highlight-box">
          <strong>Secure</strong>
          <span>Protected payment</span>
        </div>
      </div>}

      {/* PRICE */}
      <div className="price-card">
        <p className="price-label">Priority Message Fee</p>

        <h2 className="price">
          ₦{creator?.priorityFee?.toLocaleString()}
        </h2>

        <p className="price-note">
          For serious enquiries, collaborations, support or faster attention.
        </p>
      </div>

      {/* CTA */}
      <button className="cta">
        Send Priority Message
      </button>

      {/* TRUST */}
      <div className="trust">
        Secure checkout powered by <BsLockFill /> Paystack
        <br />
        <a href="/signup">Join ClusterClear</a>
      </div>

    </div>
  </div>
);
}