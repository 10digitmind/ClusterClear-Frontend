import { useState } from "react";
import "../Styles/Profile.css";
import { useSelector } from "react-redux";// replace with your actual logo path

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [userState, setUserState] = useState({
    username: "johncreator",
    bio: "I reply to fans 🔥",
    price: 2000,
    link: "clusterclear.com/johncreator",
    avatar: "https://i.pravatar.cc/150?img=5",
  });
console.log("User from Redux:", user); // Debugging line
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const handleChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setEditing(false);
  };

  const changePassword = () => {
    alert("Password changed (mock)");
  };

  const deleteAccount = () => {
    alert("Account deleted (mock)");
  };

 return (
  <div className="profile-container">

    {/* ================= PROFILE ================= */}
    <div className="profile-card">

      <div className="profile-header">
        <img className="profile-avatar" src={user.profilePic} alt="avatar" />

        <div className="profile-identity">
          <h2>@{user.username}</h2>
          <p>{user.bio || "No bio added"}</p>
        </div>
      </div>

      {!editing ? (
        <>
          <div className="profile-info">
            <div>
              <label>Price</label>
              <span>₦{user.priorityFee.toLocaleString()}</span>
            </div>

            <div>
              <label ><a style={{textDecoration:'none'}} href={user?.creatorLink || "https://clusterclear.app"} target="_blank" rel="noopener noreferrer">
                View My Link
              </a></label>
            
            </div>
          </div>

          <button className="primary-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      ) : (
        <div className="edit-form">

          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              name="price"
              value={user?.priorityFee}
              onChange={handleChange}
            />
          </div>

         

          <input type="file" className="file-input" />

          <button className="primary-btn" onClick={saveProfile}>
            Save Changes
          </button>
        </div>
      )}
    </div>

    {/* ================= PASSWORD ================= */}
    <div className="profile-card">
      <h3>Security</h3>

      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          value={passwords.new}
          onChange={(e) =>
            setPasswords({ ...passwords, new: e.target.value })
          }
        />
      </div>

      <button className="primary-btn" onClick={changePassword}>
        Update Password
      </button>
    </div>

    {/* ================= DANGER ================= */}
    <div className="profile-card danger">
      <h3>Danger Zone</h3>
      <p>This action cannot be undone.</p>

      <button className="delete-btn" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>

  </div>
);
}