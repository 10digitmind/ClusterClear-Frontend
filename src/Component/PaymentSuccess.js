import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { BsCheckCircleFill, BsShieldLockFill, BsClockHistory } from "react-icons/bs";
import api from "../Component/Api";
import '../Styles/paymentSuccess.css'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {reference} = useParams() || searchParams.get('reference');
console.log(reference)
  const [status, setStatus] = useState("verifying"); // verifying | success | failed


  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await api.get(`/verify-payment/${reference}`);
console.log(res)
        if (res.data?.status === "success") {
          setStatus("success");

        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.log(err)
        setStatus("failed");
      }
    };

    if (reference) verifyPayment();
  }, [reference]);

  return (
    <div className="payment-page">
      <div className="payment-card">
        {status === "verifying" && (
          <div className="center">
            <div className="loader" />
            <h2>Verifying your payment...</h2>
            <p>Please wait while we confirm your transaction</p>
          </div>
        )}

        {status === "success" && (
          <div className="center">
            <BsCheckCircleFill className="icon success" />
            <h2>Payment Successful</h2>
            <p>Your message has been delivered to the creator</p>

            <div className="info-box">
              <p>
                <BsShieldLockFill /> Secure transaction completed
              </p>
              <p>
                <BsClockHistory /> Priority message sent instantly
              </p>
            </div>

            <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        )}

        {status === "failed" && (
          <div className="center">
            <h2>Payment Verification Failed</h2>
            <p>Please contact support if money was deducted</p>
            <button className="btn" onClick={() => navigate("/")}>Go Home</button>
          </div>
        )}
      </div>
    </div>
  );
}
