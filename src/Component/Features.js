import React from "react";
import { motion } from "framer-motion";
import {
  AiOutlineDollarCircle,
  AiOutlineInbox,
  AiOutlineUsergroupAdd,
  AiOutlineRocket,
} from "react-icons/ai";
import "../Styles/Features.css"; // Make sure this CSS file exists

const featuresData = [
  {
    icon: <AiOutlineDollarCircle />,
    title: "Earn More",
    description:
      "Only intentional messages reach you. Get paid for your attention.",
  },
  {
    icon: <AiOutlineInbox />,
    title: "Less Clutter",
    description:
      "Filter out spam and low-priority DMs automatically.",
  },
  {
    icon: <AiOutlineUsergroupAdd />,
    title: "Meaningful Connections",
    description:
      "Connect with fans, brands, and collaborators who truly matter.",
  },
  {
    icon: <AiOutlineRocket />,
    title: "Fast Setup",
    description:
      "Start in minutes generate your link, set your fee, and go.",
  },
];



const Features = () => {
  return (
    <section className="section-purple">
      <div className="section-purple-inner">
        <h2>More Opportunities, Less Noise</h2>
  
    
        <div className="features-grid">
          {featuresData.map((feature, idx) => (
            <div className="feature" key={idx}>
              <span className="feature-icon">{feature.icon}</span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 2 }}
              >
                {feature.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;