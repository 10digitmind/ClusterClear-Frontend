import { useState } from "react";
import axios from "axios";
import "../Styles/CreateProfile.css";
import logo from "../Assest/newcluster.png"; // replace with your actual logo path

export default function CreateProfile({ userType = "creator" }) {
  const [price, setPrice] = useState("");
  const [bio, setBio] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      if (image) formData.append("profilePic", image);
      if (bio && userType === "creator") formData.append("bio", bio);
      if (price && userType === "creator") formData.append("priorityFee", price);
  

      await axios.patch("/api/onboarding/step-two", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Failed to complete profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
  }


  return (
    <>

       <header className="app-header">
      <div className="header-left">
        <div className="logo">
               <img src={logo} alt="ClusterClear Logo" />
             </div>
      </div>

      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>

    <div className="onboarding-container">
      <div className="onboarding-card">
        <p className="progress">Step 2 of 2</p>

        <h2 className="title">Turn attention into income</h2>

        <p className="subtitle">
          Set up your profile so people know who they’re connecting with.
        </p>

        <form onSubmit={handleSubmit} className="form">

          {/* IMAGE */}
          <label className="image-upload">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <div className="placeholder">Add photo</div>
            )}

            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {/* FULL NAME */}
         

          {/* CREATOR ONLY */}
          {userType === "creator" && (
            <>
              <textarea
                placeholder="Short bio (optional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="textarea"
              />

              <input
                type="number"
                placeholder="Set price (£)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input"
              />
            </>
          )}

          <button className="primary-btn" disabled={loading}>
            {loading ? "Saving..." : "Continue"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Do this later
          </button>
        </form>
      </div>
    </div>

     <footer className="app-footer">
      <p className="footer-text">
      © {new Date().getFullYear()} ClusterClear. All rights reserved.
      </p>


   
    </footer>
        </>
  );
}