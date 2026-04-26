import { useState } from "react";
import "../Styles/Wallet.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../Component/Api";
import { toast } from "sonner";
import { getCurrentUser } from "../Redux/Asycthunk";
import { useEffect } from "react";

export default function Wallet() {
  const [editBank, setEditBank] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState(user?.bankDetails.bankName || "");
  const dispatch = useDispatch();
  const [accountNumber, setAccountNumber] = useState(
    user?.bankDetails.accountNumber || "",
  );
  const [accountName, setAccountName] = useState(
    user?.bankDetails.accountName || "",
  );

  const [wallet, setWallet] = useState({
   

    withdrawals: [
      {
        id: 1,
        amount: 50000,
        status: "pending",
        date: "2026-04-01",
      },
      {
        id: 2,
        amount: 30000,
        status: "approved",
        date: "2026-03-20",
      },
      {
        id: 3,
        amount: 20000,
        status: "failed",
        date: "2026-03-10",
      },
    ],
  });

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const requestWithdraw = () => {
    if (!withdrawAmount) return;

    const newRequest = {
      id: Date.now(),
      amount: Number(withdrawAmount),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    setWallet((prev) => ({
      ...prev,
      withdrawals: [newRequest, ...prev.withdrawals],
      balance: prev.balance - newRequest.amount,
    }));

    setWithdrawAmount("");
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!bankName || !accountNumber || !accountName) {
        toast.error("All fields are required");
        return;
      }
      if (accountNumber.length < 10) {
        toast.error("Account number must be  10 digit ");
        return;
      }

      const res = await api.patch("/update-bank-details", {
        bankName,
        accountName,
        accountNumber,
      });
      await dispatch((getCurrentUser()));

      toast.success(res.data.message);
      setTimeout(() => {
        setEditBank(false);
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (user?.bankDetails) {
    setBankName(user.bankDetails.bankName || "");
    setAccountNumber(user.bankDetails.accountNumber || "");
    setAccountName(user.bankDetails.accountName || "");
  }
}, [user]);
  return (
    <div className="wallet-container">
      {/* ================= TOP BALANCE ================= */}
      <div className="wallet-card">
        <h2>Wallet</h2>

        <div className="balance-box">
          <h1>₦{user?.wallet.availableBalance.toLocaleString()}</h1>
          <p>Available Balance</p>
        </div>

        <div className="stats">
          <div>
            <p>Total Earned</p>
            <strong>₦{user?.wallet.totalEarned.toLocaleString()}</strong>
          </div>

          <div>
            <p>Priority Fee</p>
            <strong>₦{user?.priorityFee.toLocaleString()}</strong>
          </div>
        </div>
      </div>

    

      {/* ================= BANK DETAILS ================= */}
      <div className="wallet-card">
        <h3>Bank Details</h3>

        {!editBank ? (
          <>
            <p>
              {user?.bankDetails.bankName === null
                ? "Bank Name not provided"
                : user?.bankDetails.bankName}
            </p>
            <p>
              {user?.bankDetails.accountNumber === null
                ? "Account Number not provided"
                : user?.bankDetails.accountNumber}
            </p>
            <p>
              {user?.bankDetails.accountName === null
                ? "Account Name not provided"
                : user?.bankDetails.accountName}
            </p>

            <button onClick={() => setEditBank(true)}>
              {user?.bankDetails.bankName === null
                ? "Add Bank Details"
                : "Edit Bank Details"}
            </button>
          </>
        ) : (
          <div className="bank-edit">
            <input
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank Name"
              value={ bankName}
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              placeholder="Account Number"
              value={ accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/g, ""))
              }
            />
            <input
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account Name"
              value={ accountName}
            />

            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
  {/* ================= WITHDRAW ================= */}
      <div className="wallet-card">
        <h3>Withdraw Funds</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />

        <button onClick={requestWithdraw}>Withdraw</button>
      </div>
      {/* ================= WITHDRAWAL HISTORY ================= */}
      <div className="wallet-card">
        <h3>Withdrawal History</h3>

        {wallet.withdrawals.map((w) => (
          <div key={w.id} className="withdraw-item">
            <div>
              <strong>₦{w.amount.toLocaleString()}</strong>
              <p>{w.date}</p>
            </div>

            <span className={`status ${w.status}`}>{w.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
