import React from "react";
import "../Styles/Creator.css"; // Make sure to create this CSS file for styling
import { BsPatchCheckFill } from "react-icons/bs";
export default function CreatorPage() {
  const creator = {
    name: "Davido",
    username: "davido",
    bio: "Content creator • Fashion • Lifestyle",
    price: 10000,
    avatar: "https://i.pravatar.cc/150?img=5",
  };

  return (
    <div className="creator-wrapper">

      <div className="creator-card">

        {/* PROFILE */}
        <div className="profile">
          <img src={creator.avatar} alt="Avatar" className="avatar" />

         <h2 className="username">
  @{creator.username}
  <BsPatchCheckFill className="verified" />
</h2>

          <p className="bio">{creator.bio}</p>

          <p className="status">
            ● Usually replies within 1 hour
          </p>
        </div>

        {/* STATS */}
        <div className="stats">
          <div>
            <strong>98%</strong>
            <span>Response rate</span>
          </div>

          <div>
            <strong>1hr</strong>
            <span>Avg Response</span>
          </div>

          <div>
            <strong>1.5k</strong>
            <span>Paid Replies</span>
          </div>
        </div>

        {/* REVIEW */}
        <div className="review">
          ⭐ 4.9 (320 reviews)  
          <p>“Fast replies and very professional.”</p>
        </div>

        {/* PRICE */}
        <div className="review">
          <h1>₦{creator.price.toLocaleString()}/Message </h1>
          <p>“For serious inquiries ,collaboration and priority responses”</p>
        </div>

        {/* CTA */}
        <button className="cta">
          Send Priority Message
        </button>

        {/* TRUST */}
        <div className="trust">
          Secure payment with <b>Paystack</b>  
          <br />
       <a href="/signup">Join ClusterClear</a>
        </div>

      </div>
    </div>
  );
}