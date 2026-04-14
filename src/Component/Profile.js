import { useState } from "react";
import "../Styles/Profile.css";

export default function Profile() {
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    username: "johncreator",
    bio: "I reply to fans 🔥",
    price: 2000,
    link: "clusterclear.com/johncreator",
    avatar: "https://i.pravatar.cc/150?img=5",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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

      {/* ================= PROFILE CARD ================= */}
      <div className="profile-card">

        <div className="profile-top">
          <img className="profile-avatar" alt="avatar" src={user.avatar} />

          {editing && (
            <input type="file" />
          )}
        </div>

        {!editing ? (
          <>
            <h2>@{user.username}</h2>
            <p>{user.bio}</p>

            <div className="profile-info">
              <span>Price: ₦{user.price}</span>
              <span>Link: {user.link}</span>
            </div>

            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <div className="edit-form">
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
            />

            <input
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Bio"
            />

            <input
              name="price"
              value={user.price}
              onChange={handleChange}
              placeholder="Price"
            />

            <input
              name="link"
              value={user.link}
              onChange={handleChange}
              placeholder="Link"
            />

            <button onClick={saveProfile}>Save</button>
          </div>
        )}
      </div>

      {/* ================= PASSWORD ================= */}
      <div className="profile-card">
        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwords.new}
          onChange={(e) =>
            setPasswords({ ...passwords, new: e.target.value })
          }
        />

        <button onClick={changePassword}>
          Update Password
        </button>
      </div>

      {/* ================= DANGER ZONE ================= */}
      <div className="profile-card danger">
        <h3>Danger Zone</h3>

        <button className="delete-btn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}