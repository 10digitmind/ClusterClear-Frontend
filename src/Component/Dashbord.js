import { useState } from "react";
import { Copy } from "lucide-react";
import "../Styles/Dashboard.css";
import Analytics from "../Component/Analytics";
import Messages from "../Component/Message";
import Notifications from "../Component/Notifications";
import Wallet from "../Component/Wallet";
import Profile from "../Component/Profile";
import { FiBell, FiBarChart2, FiMessageSquare, FiUser,FiArrowDownRight,FiDollarSign } from "react-icons/fi";

// --- Individual Pages (Stripe-style sections) ---







const pages = [
  {
    name: "Notifications",
    component: Notifications,
    icon: <FiBell />,
  },
   { name: "Wallet", icon: <FiDollarSign />, component: Wallet },
  {
    name: "Analytics",
    component: Analytics,
    icon: <FiBarChart2 />,
  },
  {
    name: "Messages",
    component: Messages,
    icon: <FiMessageSquare />,
  },
    { name: "Profile", icon: <FiUser />, component: Profile },
    { name: "Logout", icon: <FiArrowDownRight />, component: 'logout' },
     
];

export default function SidebarDashboard() {

  const [active, setActive] = useState("Notifications");
const activePageObj = pages.find((p) => p.name === active);
const ActivePage = activePageObj?.component;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://clusterclear.com");
      alert("Link copied!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">Cluster Clear</div>
          <button className="copy-btn" onClick={copyLink}>
            <Copy size={16} /> Copy Link
          </button>
        </div>

      <nav className="nav">
  {pages.map((page) => (
    <button
      key={page.name}
      className={`nav-item ${active === page.name ? "active" : ""}`}
      onClick={() => setActive(page.name)}
    >
      <span className="icon">{page.icon}</span>
      <span>{page.name}</span>
    </button>
  ))}
</nav>
  <div className="sidebar-footer"> <FiUser />  welcome  Shade</div>
        <div className="sidebar-footer">Cluster Clear Dashboard</div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="page-wrapper fade-in">
          <ActivePage />
        </div>
      </main>

      {/* Stripe-style CSS */}
      {/* dashboard.css */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Inter, system-ui, sans-serif;
        }

        .layout {
          display: flex;
          height: 100vh;
          background: #f7f5f5;
          color: black;
          height: 100%;
          min-height: 100vh;
        }

        .sidebar {
          width: 280px;
          background: #ffffff;
          color: #111;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e5e5e5;
        }

        .sidebar-top {
          padding: 16px;
          border-bottom: 1px solid #eee;
        }

        .brand {
          font-weight: 700;
          margin-bottom: 10px;
        }

        .copy-btn {
          width: 100%;
          background: #6355FE;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s ease;
        }

        .copy-btn:hover {
          transform: translateY(-1px);
          opacity: 0.9;
        }

        .nav {
          flex: 1;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-item {
          padding: 12px 14px;
          border-radius: 10px;
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: #f2f2f2;
        }

        .nav-item.active {
          background: #6355FE;
          color: white;
          transform: translateX(4px);
        }

        .sidebar-footer {
          padding: 12px;
          font-size: 12px;
          color: #888;
          border-top: 1px solid #eee;
        }

        .main {
          flex: 1;
          padding: 30px;
        }

        .page-wrapper {
          animation: fadeIn 0.25s ease;
        }

        .page {
          font-size: 24px;
          font-weight: 600;
        }
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
