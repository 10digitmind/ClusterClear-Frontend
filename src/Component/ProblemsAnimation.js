import React from "react";
import "../Styles/ProblemsAnimation.css";
import image1 from "../Assest/1.png";
import image2 from "../Assest/2.png";
import image3 from "../Assest/3.png";
import image4 from "../Assest/4.png";

const problemsImages = [
  image1,
  image2,
  image3,
  image4
]
  

const ProblemsAnimation = () => {
 return (
    <section className="problems-loop-section">
      <div className="problems-loop-wrapper">
        <div className="problems-loop-track">
          {[...problemsImages, ...problemsImages].map((img, idx) => (
            <div className="problems-loop-item" key={idx}>
              <img src={img} alt={`Problem ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsAnimation;