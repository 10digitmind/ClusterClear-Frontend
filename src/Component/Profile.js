import { useState } from "react";
import "../Styles/Profile.css";
import { useSelector } from "react-redux";// replace with your actual logo path
import { useEffect } from "react";
import api from '../Component/Api';
import {toast} from "sonner";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../Redux/Asycthunk";
import {updateCreatorProfile} from "../Redux/Asycthunk";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [draft, setDraft] = useState({
    username: "",
    bio: "",
    priorityFee: "",
    profilePic: null,
  });

  const dispatch = useDispatch();

  const [usernameStatus, setUsernameStatus] = useState(null);
  const [usernameMessage, setUsernameMessage] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  // sync user → draft when entering edit mode
  const startEditing = () => {
    setDraft({
      username: user?.username || "",
      bio: user?.bio || "",
      priorityFee: user?.priorityFee || "",
      profilePic: user?.profilePic || null,
    });

    setEditing(true);
  };

  const handleChange = (e) => {
    setDraft((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // username check (debounced)
 useEffect(() => {
  if (!draft.username || draft.username.length < 3) {
    setUsernameStatus(null);
    setUsernameMessage("");
    return;
  }

  const delay = setTimeout(async () => {
    try {
      setUsernameStatus("checking");
      setUsernameMessage("");

      const res = await api.get(
        `/check-username/${draft.username}`
      );

      setUsernameStatus(res.data.available);
      setUsernameMessage(res.data.message || "");

    } catch (err) {
      setUsernameStatus(false);
      setUsernameMessage(
        err.response?.data?.message || "Error checking username"
      );
    }
  }, 500);

  return () => clearTimeout(delay);
}, [draft.username]);

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  if (file.size > MAX_SIZE) {
    toast.error(
      `Image is ${(
        file.size / 1024 / 1024
      ).toFixed(2)}MB. Max allowed is 2MB`
    );

    e.target.value = "";

    setDraft((prev) => ({
      ...prev,
      profilePic: null,
      preview: null,
    }));

    return;
  }

  // success case
  setDraft((prev) => ({
    ...prev,
    profilePic: file,
    preview: URL.createObjectURL(file),
  }));
};
  const saveProfile = async (e) => {
    e.preventDefault();
  try {
    const formData = new FormData();

    formData.append("username", draft.username);
    formData.append("profileBio", draft.bio);
    formData.append("priorityFee", draft.priorityFee);

    if (draft.profilePic) {
      formData.append("profilePic", draft.profilePic); // must match multer field name
    }
console.log("FormData entries:", [...formData.entries()]);

    const res = await dispatch(updateCreatorProfile(formData)).unwrap()
  await dispatch(getCurrentUser());
    toast.success(res.message || "Profile updated");
    setEditing(false);

  } catch (err) {

    toast.error("Failed to update profile");

  }
};



  const changePassword = async () => {
  try {
    const res = await api.patch("/change-password", {
      oldPassword: passwords.current,
      newPassword: passwords.new,
    });

    toast.success(res.data.message || "Password updated successfully");

    if(res.data.message === "Password changed successfully"){

      setTimeout(() => {
         localStorage.clear();
      window.location.href = "/login";
      }, 2000);
     
    }
    setPasswords({
      current: "",
      new: "",
    });

  } catch (err) {
    console.log(err);
    console.log("Error response:", err);
    toast.error(
      err.response?.data?.message || "Failed to change password"
    );
  }
};

  const deleteAccount = () => {
    alert("Account deleted (mock)");
  };
 const isUsernameChanged = draft.username !== user?.username;

const canSave =
  draft.username &&
  draft.username.length >= 3 &&
  draft.bio &&
  draft.priorityFee > 0 &&
  (!isUsernameChanged || usernameStatus === true) &&
  usernameStatus !== "checking";

  return (
    <div className="profile-container">

      {/* ================= PROFILE ================= */}
      <div className="profile-card">

        <div className="profile-header">
          <img
            className="profile-avatar"
            src={user?.profilePic}
            alt="avatar"
          />

          <div className="profile-identity">
            <h2>@{user?.username}</h2>
            <p>{user?.bio || "No bio added"}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="profile-info">
              <div>
                <label>Price</label>
                <span>₦{user?.priorityFee?.toLocaleString()}</span>
              </div>

              <div>
                
                <a sttyle={{color:"#e7e8e9" ,textDecoration:"none"}}
                  href={user?.creatorLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  View My Link
                </a>
              </div>
            </div>

            <button className="primary-btn" onClick={startEditing}>
              Edit Profile
            </button>
          </>
        ) : (
          <div className="edit-form">

            {/* USERNAME */}
            <div className="form-group">
              <label>Username</label>

              <input
                name="username"
                value={draft.username}
                onChange={handleChange}
              />

              {usernameStatus === "checking" && (
                <p className="hint">Checking...</p>
              )}

              {usernameStatus === true && (
                <p className="success">Available</p>
              )}

              {usernameStatus === false && (
                <p className="error">{usernameMessage}</p>
              )}
            </div>

            {/* BIO */}
            <div className="form-group">
              <label>Bio</label>

              <textarea
                name="bio"
                value={draft.bio}
                onChange={handleChange}
              />
            </div>

            {/* PRICE */}
            <div className="form-group">
              <label>Price</label>

              <input
                name="priorityFee"
                value={draft.priorityFee}
                onChange={handleChange}
              />
            </div>

            <input type="file" onChange={handleImageChange}  className="file-input" />

           <button
  className="primary-btn"
  onClick={saveProfile}
  disabled={!canSave}
>
  Save Changes
</button>
          </div>
        )}
      </div>

      {/* ================= PASSWORD ================= */}
   <div className="profile-card">
  <h3>Security</h3>

  {/* CURRENT PASSWORD */}
  <div className="password-field">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Current Password"
      value={passwords.current}
      onChange={(e) =>
        setPasswords({
          ...passwords,
          current: e.target.value,
        })
      }
    />
  </div>

  {/* NEW PASSWORD */}
  <div className="password-field">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="New Password"
      value={passwords.new}
      onChange={(e) =>
        setPasswords({
          ...passwords,
          new: e.target.value,
        })
      }
    />
  </div>

  {/* TOGGLE BUTTON */}
  <button
    type="button"
    className="toggle-btn"
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? "Hide Passwords" : "Show Passwords"}
  </button>

  {/* SUBMIT */}
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