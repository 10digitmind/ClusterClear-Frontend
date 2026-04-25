import { useState } from "react";
import { Copy } from "lucide-react";
import "../Styles/Dashboard.css";
import Analytics from "./Analytics";
import Messages from "./Message";
import Wallet from "./Wallet";
import Profile from "./Profile";
import {  FiBarChart2, FiMessageSquare, FiUser,FiArrowDownRight,FiDollarSign } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// --- Individual Pages (Stripe-style sections) ---







const mainPages = [
  { name: "Wallet", icon: <FiDollarSign />, component: Wallet },
  { name: "Analytics", icon: <FiBarChart2 />, component: Analytics },
  { name: "Messages", icon: <FiMessageSquare />, component: Messages },
];

const accountPages = [
  { name: "Profile", icon: <FiUser />, component: Profile },
];

export default function SidebarDashboard() {
  const [active, setActive] = useState("Wallet");
  const user = useSelector((state) => state.auth.user);

  const activePage =
    [...mainPages, ...accountPages].find((p) => p.name === active)
      ?.component;

  const ActivePage = activePage;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(user?.creatorLink || "https://clusterclear.app");
    toast.success("Link copied to clipboard");
  };

  if (user?.onboardingStage === "none") {
    window.location.href = "/onboarding-step-one";
    return null;
  }

  if (user?.onboardingStage === "step_two") {
    window.location.href = "/onboarding-step-two";
    return null;
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        {/* TOP */}
        <div className="sidebar-top">
          <div className="brand">Cluster Clear</div>

          <button className="copy-btn" onClick={copyLink}>
            <Copy size={16} /> Copy Link
          </button>
        </div>

        {/* MAIN NAV */}
        <div className="nav-section">
          <p className="nav-title">Overview</p>

          {mainPages.map((page) => (
            <button
              key={page.name}
              className={`nav-item ${
                active === page.name ? "active" : ""
              }`}
              onClick={() => setActive(page.name)}
            >
              {page.icon}
              <span>{page.name}</span>
            </button>
          ))}
        </div>

        {/* ACCOUNT */}
        <div className="nav-section">
          <p className="nav-title">Account</p>

          {accountPages.map((page) => (
            <button
              key={page.name}
              className={`nav-item ${
                active === page.name ? "active" : ""
              }`}
              onClick={() => setActive(page.name)}
            >
              {page.icon}
              <span>{page.name}</span>
            </button>
          ))}
        </div>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <div className="user-box">
            <FiUser />
            <span>{user?.username}</span>
          </div>

          <button className="logout-btn" onClick={logout}>
            <FiArrowDownRight /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <div className="page-wrapper">
          <ActivePage />
        </div>
      </main>
    </div>
  );
}
