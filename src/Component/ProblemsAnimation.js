import React from "react";
import "../Styles/ProblemsAnimation.css";


const reasons = [
  "No more free promo requests",
  "Only paid messages",
  "Serious brands only",
  "Stop wasting time in DMs",
  "Get real opportunities",
  "Filter out time-wasters",
];

const ProblemsAnimation = () => {
  return (
    <section className="loop-section">
      <h2 style={{color: "#000000", marginBottom: "30px"}}>Why Creators Love ClusterClear</h2>
      <div className="loop-track">
        {[...reasons, ...reasons].map((text, idx) => (
          <div className="loop-item" key={idx}>
            {text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemsAnimation;