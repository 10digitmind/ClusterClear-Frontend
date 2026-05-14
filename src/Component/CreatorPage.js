import React, { useEffect, useState } from "react";
import "../Styles/Creator.css";
import Swal from "sweetalert2";


import {
  BsPatchCheckFill,
  BsLockFill,
  BsShieldLockFill,
  BsClockFill,
  BsInboxFill,
} from "react-icons/bs";

import { useParams } from "react-router-dom";
import api from "../Component/Api";
import { toast } from "sonner";

export default function CreatorPage() {
  const [creator, setCreator] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    buyerEmail: "",
    buyerPhone: "",
    message: "",
    subject: "",
  });

  const [sending, setSending] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/creator/${username}`);

        setCreator(res.data.creator);
      } catch (err) {
        setError(err.response?.data?.message || "Creator not found");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchCreator();
    }
  }, [username]);

  useEffect(() => {
    const trackClick = async () => {
      try {
        await api.get(`/track-link-click/${username}`);
      } catch (err) {
        console.error("Tracking failed", err);
      }
    };

    if (username) trackClick();
  }, [username]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const sendMessage = async () => {
    if (
      !form.buyerEmail ||
      !form.buyerPhone ||
      !form.message ||
      !form.subject
    ) {
      toast.error("Fill all the form please");
      return;
    }
    try {
      setSending(true);

      const res = await api.post(`/initialise-payment`, {
        creatorId: creator._id,
        buyerEmail: form.buyerEmail,
        buyerPhone: form.buyerPhone,
        message: form.message,
        subject: form.subject,
      });
      localStorage.setItem("paymentRef", res.data.reference);

      window.open(res.data.paymentLink, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed");
    } finally {
      setSending(false);
    }
  };

 const confirmEmail = async () => {
  if (
    !form.buyerEmail ||
    !form.buyerPhone ||
    !form.message ||
    !form.subject
  ) {
    toast.error("Fill all the form please");
    return;
  }

  const result = await Swal.fire({
    title: "Confirm Email",
    text: `Is ${form.buyerEmail} correct?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, continue",
  });

  if (result.isConfirmed) {
    sendMessage();
  }
};

  const hasStats = creator?.totalRequests >= 5;

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
    <>
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
                {creator?.bio ||
                  "Available for priority messages and business enquiries."}
              </p>

              <span className="availability">● Usually replies quickly</span>
            </div>
          </div>

          {/* STATS */}
          {hasStats ? (
            <div className="highlights">
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
            </div>
          ) : (
            <div className="highlights">
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
            </div>
          )}

          {/* PRICE */}
          <div className="price-card">
            <p className="price-label">Priority Message Fee</p>

            <h2 className="price">₦{creator?.priorityFee?.toLocaleString()}</h2>

            <p className="price-note">
              For serious enquiries, collaborations, support or faster
              attention.
            </p>
          </div>

          {/* CTA */}
          <button className="cta" onClick={() => setShowModal(true)}>
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-wrap">
          <div className="modal-bg" onClick={() => setShowModal(false)} />

          <div className="modal-box">
            <button className="close-x" onClick={() => setShowModal(false)}>
              ×
            </button>

            <h2>Message @{creator.username}</h2>

            <form onSubmit={sendMessage}>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select subject</option>
                <option value="collaboration">Collaboration</option>
                <option value="promotion">Promotion</option>
                <option value="support">Support</option>
                <option value="business_inquiry">Business Inquiry</option>
                <option value="other">Other</option>
              </select>

              <input
                type="email"
                name="buyerEmail"
                placeholder="Your Email"
                value={form.buyerEmail}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="buyerPhone"
                placeholder="Phone Number"
                value={form.buyerPhone}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />

              <div className="trust-info">
                <p>
                  <BsInboxFill className="trust-icon" />
                  Priority message goes to the top of inbox
                </p>

                <p>
                  <BsClockFill className="trust-icon" />
                  Higher chance of faster response
                </p>

                <p>
                  <BsShieldLockFill className="trust-icon" />
                  Secure payment protection
                </p>

                <p>
                  <BsPatchCheckFill className="trust-icon" />
                  If no response within 24 hours, you’re eligible for a refund
                </p>
              </div>

          <button
  type="button"
onClick={confirmEmail}
  disabled={sending}
  className="pay-btn"
>
  {sending
    ? "Loading..."
    : `Pay ₦${creator.priorityFee.toLocaleString()} & Send`}
</button>
            </form>

            
          </div>
        </div>
      )}
    </>
  );
}
