import { useState } from "react";
import "../Styles/CreateProfile.css";
import { useSelector } from "react-redux";// replace with your actual logo path
import AppHeader from "./AppHeader";
import { useDispatch } from "react-redux";

import { stepTwo } from "../Redux/Asycthunk";
import { toast } from "sonner";

export default function CreateProfile({ userType = "creator" }) {
  const [priorityFee, setPriorityFee] = useState("");
  const [bio, setBio] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  const user = useSelector((state) => state.auth.user);
const dispatch = useDispatch();



const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  if (file.size > MAX_SIZE) {
    toast.error(`✔ Image selected ${Math.round(file.size / 1024 / 1024 * 100) / 100}MB
⚠ Max image allowed : 2MB`);
    e.target.value = null; // reset input
    return;
  }

  setProfilePic(file);
  setPreview(URL.createObjectURL(file));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (!bio || !priorityFee) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("priorityFee", priorityFee);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    const result = await dispatch(stepTwo(formData)).unwrap();

    if (result.message === "Onboarding completed") {
      window.location.href = "/dashboard";
    }

  } catch (err) {
    toast.error(err||"Failed to complete profile");
 
  } finally {
    setLoading(false);
  }
};
 const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

   if(user?.onboardingStage ==='none') {

    window.location.href = "/onboarding-step-one";
    return null
  }else if(user?.onboardingStage === 'completed') {
    window.location.href = "/dashboard";
    return null
   }

  return (

    
    <>
 <AppHeader user={{ name: user?.username }} onLogout={handleLogout} />

    <div className="onboarding-container">
      <div className="onboarding-card">
        <p className="progress">Step 2 of 2 </p>
      
        <h2 className="title">{user?.role === "creator" ? "Turn attention into income" : "Complete your profile"} </h2>

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
          {user?.role === "creator" && (
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
                value={priorityFee}
                onChange={(e) => setPriorityFee(e.target.value)}
                className="input"
              />
            </>
          )}

          <button className="primary-btn" disabled={loading}>
            {loading ? "Saving..." : "Continue"}
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