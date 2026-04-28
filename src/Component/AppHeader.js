import "../Styles/AppHeader.css";
import logo from "../Assest/newcluster.png"; 

export default function AppHeader({ user, onLogout }) {
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.map(p => p[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="app-header">
      
      {/* LEFT */}
      <div className="header-left">
        <img src={logo} alt="ClusterClear" className="logo" />
      </div>

      {/* CENTER */}
      <div className="header-center">
        <p className="welcome-text">
          👋 Welcome back, <span>{user?.name }</span>
        </p>
      </div>

      {/* RIGHT */}
      <div className="header-right">

        {/* AVATAR */}
        <div className="avatar-header">
          {user?.profilePic ? (
            <img src={user.profilePic} alt="avatar" />
          ) : (
            <span>{getInitials(user?.name)}</span>
          )}
        </div>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>

    </header>
  );
}