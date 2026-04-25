import { useState } from "react";
import "../Styles/Wallet.css";
import { useSelector } from "react-redux";

export default function Wallet() {
  const [editBank, setEditBank] = useState(false);
  const {user} = useSelector((state) => state.auth);

  const [wallet, setWallet] = useState({
    balance: 125000,
    priorityFee: 5000,
    totalEarned: 300000,

    bank: {
      bankName: "GTBank",
      accountNumber: "0123456789",
      accountName: "John Creator",
    },

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

      {/* ================= WITHDRAW ================= */}
      <div className="wallet-card">
        <h3>Withdraw Funds</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />

        <button onClick={requestWithdraw}>
          Withdraw
        </button>
      </div>

      {/* ================= BANK DETAILS ================= */}
      <div className="wallet-card">
        <h3>Bank Details</h3>

        {!editBank ? (
          <>
            <p>{user?.bankDetails.bankName === null ? "Bank Name not provided" : user?.bankDetails.bankName}</p>
            <p>{user?.bankDetails.accountNumber === null ? "Account Number not provided" : user?.bankDetails.accountNumber}</p>
            <p>{user?.bankDetails.accountName === null ? "Account Name not provided" : user?.bankDetails.accountName}</p>

            <button onClick={() => setEditBank(true)}>
             {user?.bankDetails.bankName === null ? "Add Bank Details" : "Edit Bank Details"}
            </button>
          </>
        ) : (
          <div className="bank-edit">
            <input placeholder="Bank Name" />
            <input placeholder="Account Number" />
            <input placeholder="Account Name" />

            <button onClick={() => setEditBank(false)}>
              Save
            </button>
          </div>
        )}
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

            <span className={`status ${w.status}`}>
              {w.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}