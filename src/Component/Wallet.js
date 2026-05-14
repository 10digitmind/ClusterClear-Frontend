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
    const { loading } = useSelector((state) => state.auth);

 
  const [bankName, setBankName] = useState(user?.bankDetails?.bankName || "");
  const dispatch = useDispatch();
  const [accountNumber, setAccountNumber] = useState(
    user?.bankDetails?.accountNumber || "",
  );
  const [accountName, setAccountName] = useState(
    user?.bankDetails?.accountName || "",
  );

 

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const requestWithdraw = () => {
    if (!withdrawAmount) return;

    const newRequest = {
      id: Date.now(),
      amount: Number(withdrawAmount),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };


    setWithdrawAmount("");
  };

  const handleSave = async () => {
    try {
  
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
    } finally {;
    }
  };

  useEffect(() => {
  if (user?.bankDetails) {
    setBankName(user?.bankDetails?.bankName || "");
    setAccountNumber(user?.bankDetails?.accountNumber || "");
    setAccountName(user?.bankDetails?.accountName || "");
  }
}, [user]);
  return (
    <div className="wallet-container">
      {/* ================= TOP BALANCE ================= */}
     <div className="wallet-card">
  <h2>
    Wallet
  </h2>

  {/* Available Balance */}
  <div className="balance-box">
    {loading ? (
      <h1>Loading Balance..</h1>
    ) : (
      <h1>₦{user?.wallet?.availableBalance?.toLocaleString()}</h1>
    )}

    <p>
      Available Balance
      <span className="tooltip">
        ⓘ
        <span className="tooltip-text">
          Money you can withdraw immediately.
        </span>
      </span>
    </p>
  </div>

  {/* Stats */}
  <div className="stats">

    {/* Total Earned */}
    <div>
      <p>
        Total Earned
        <span className="tooltip">
          ⓘ
          <span className="tooltip-text">
            Total money you’ve earned from all completed transactions.
          </span>
        </span>
      </p>

      {loading ? (
        <strong>loading...</strong>
      ) : (
        <strong>₦{user?.wallet?.totalEarned?.toLocaleString()}</strong>
      )}
    </div>

    {/* Pending */}
    <div>
      <p>
        Pending
        <span className="tooltip">
          ⓘ
          <span className="tooltip-text">
            Money from recent transactions that will be added after confirmation.
          </span>
        </span>
      </p>

      {loading ? (
        <strong>loading...</strong>
      ) : (
        <strong style={{ color: "grey" }}>
          ₦{user?.wallet?.pendingBalance?.toLocaleString()}
        </strong>
      )}
    </div>

    {/* Priority Fee */}
    <div>
      <p>
        Priority Fee
        <span className="tooltip">
          ⓘ
          <span className="tooltip-text">
            Extra fee users pay to make their message appear at the top and get faster responses.
          </span>
        </span>
      </p>

      {loading ? (
        <strong>loading...</strong>
      ) : (
        <strong>₦{user?.priorityFee?.toLocaleString()}</strong>
      )}
    </div>

  </div>
</div>

    

      {/* ================= BANK DETAILS ================= */}
      {loading?<p>Loading bank details...</p>:<div className="wallet-card">
        <h3>Bank Details</h3>

        {!editBank ? (
          <>
            <p>
              {user?.bankDetails?.bankName === null
                ? "Bank Name not provided"
                : user?.bankDetails?.bankName}
            </p>
            <p>
              {user?.bankDetails?.accountNumber === null
                ? "Account Number not provided"
                : user?.bankDetails?.accountNumber}
            </p>
            <p>
              {user?.bankDetails?.accountName === null
                ? "Account Name not provided"
                : user?.bankDetails?.accountName}
            </p>

            <button onClick={() => setEditBank(true)}>
              {user?.bankDetails?.bankName === null
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
      </div>}
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
      {/* <div className="wallet-card">
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
      </div> */}
    </div>
  );
}
