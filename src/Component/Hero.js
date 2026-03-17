import React from "react";
import "../Styles/Hero.css"; // make sure to create this CSS file for styling
import {motion} from 'framer-motion'
import videoSrc from "../Assest/pay (2).mp4"; 
import videoSrc2 from '../Assest/pay (2) copy.mov'// replace with your actual video path
import { AiOutlineArrowRight } from "react-icons/ai";
const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-inner">

        <div className="hero-left">

          <motion.h1 
          initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 3, ease: "easeInOut" }}>
       Priority access to creators’ DMs. No clutter. Just meaningful connections.
     
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 3, ease: "easeInOut" }}
          >
  Connect only with fans, brands and collaborators who matter. A small <span style={{ textTransform: "uppercase" }}>priority fee</span> guarantees every message is meaningful, boosting opportunities and earnings.</motion.p>

        < motion.button className="hero-btn" 
       initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.4, duration: 0.7 }} >
  Get started<AiOutlineArrowRight className="hero-btn-icon" />
</motion.button>

        </div>

        <div className="hero-right">
      <motion.video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
  poster="/hero-preview.png"
  initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.8 }}
>
  <source src={videoSrc} type="video/mp4" />
   <source src={videoSrc2} type="video/quicktime" />
</motion.video>

        </div>

      </div>
      

    </section>
  );
};

export default Hero;