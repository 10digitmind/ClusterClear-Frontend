import { useState } from "react";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export default function SendPriorityMessage({
  creator,
  open,
  onClose,
}) {
  const [form, setForm] = useState({
    buyerEmail: "",
    buyerPhone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.buyerEmail || !form.message) {
      setError("Email and message are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${api}/initialise-payment`,
        {
          creatorId: creator._id,
          buyerEmail: form.buyerEmail,
          buyerPhone: form.buyerPhone,
          message: form.message,
        }
      );

      window.location.href =
        res.data.paymentLink;

    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to continue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="overlay"
        onClick={onClose}
      />

      <div className="priority-modal">
        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>
          Message @{creator.username}
        </h2>

        <p className="subtext">
          Priority inbox • usually faster
          replies
        </p>

        <div className="price-box">
          ₦
          {creator.priorityFee?.toLocaleString()}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="buyerEmail"
            placeholder="Your Email"
            value={form.buyerEmail}
            onChange={handleChange}
          />

          <input
            type="text"
            name="buyerPhone"
            placeholder="Phone (optional)"
            value={form.buyerPhone}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows="5"
            maxLength={1000}
            value={form.message}
            onChange={handleChange}
          />

          <div className="count">
            {form.message.length}/1000
          </div>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="pay-btn"
          >
            {loading
              ? "Loading..."
              : `Pay ₦${creator.priorityFee?.toLocaleString()} & Send`}
          </button>
        </form>

        <p className="foot">
          Secure checkout powered by
          Paystack
        </p>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          z-index: 999;
        }

        .priority-modal {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(
            -50%,
            -50%
          );
          width: 95%;
          max-width: 430px;
          background: white;
          border-radius: 22px;
          padding: 24px;
          z-index: 1000;
          box-shadow: 0 25px 60px
            rgba(0, 0, 0, 0.18);
        }

        .close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          border: none;
          background: #f2f2f2;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
        }

        h2 {
          margin: 0;
          font-size: 24px;
          text-align: center;
        }

        .subtext {
          text-align: center;
          color: #777;
          font-size: 14px;
          margin-top: 6px;
        }

        .price-box {
          text-align: center;
          margin: 18px 0;
          font-size: 28px;
          font-weight: 700;
          color: #6355fe;
        }

        input,
        textarea {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid #e5e5e5;
          margin-bottom: 12px;
          font-size: 16px;
          outline: none;
          resize: none;
          box-sizing: border-box;
        }

        textarea {
          min-height: 130px;
        }

        .count {
          font-size: 12px;
          color: #888;
          text-align: right;
          margin-top: -6px;
          margin-bottom: 10px;
        }

        .error {
          color: red;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .pay-btn {
          width: 100%;
          border: none;
          padding: 15px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          color: white;
          background: linear-gradient(
            135deg,
            #6355fe,
            #7b6fff
          );
          cursor: pointer;
        }

        .pay-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .foot {
          margin-top: 14px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }

        @media (max-width: 480px) {
          .priority-modal {
            width: 100%;
            max-width: 100%;
            bottom: 0;
            top: auto;
            left: 0;
            transform: none;
            border-radius: 24px 24px 0
              0;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}