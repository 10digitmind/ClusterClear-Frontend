import { FaTwitter, FaInstagram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FiShield } from "react-icons/fi";
import logo from "../Assest/newcluster.png"; 
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>
     <div className="logo">
         <img src={logo} alt="ClusterClear Logo" />
       </div>
        
        </div>

        <div style={styles.links}>
          <a href="#about" style={styles.link}>About</a>
          <a href="#explore" style={styles.link}>Explore</a>
          <a href="#become-creator" style={styles.link}>FAQ</a>
          <a href="#support" style={styles.link}>Support</a>
        </div>

        <div style={styles.socials}>
          <FaTwitter size={18} />
          <FaInstagram size={18} />
          <HiMail size={18} />
        </div>
      </div>

      <div style={styles.bottom}>
        <div style={styles.bottomLeft}>
          <FiShield size={14} />
          <span>Secure & trusted platform</span>
        </div>

        <div style={styles.bottomRight}>
          <span>© {new Date().getFullYear()} ClusterClear. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

const styles = {
footer: {
  background: "white",
  color: "black",
  padding: "60px 20px 30px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  borderTop: "1px solid #eaeaea",
},

  container: {
    display: "flex",
    justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 50px",
    flexWrap: "wrap",
    gap: "30px",
    maxWidth: "1100px",
   
  },

  brand: {
    maxWidth: "250px",
  },

  logo: {
    color: "#6355FE",
    marginBottom: "10px",
  },

  tagline: {
    color: "#000000",
    fontSize: "0.9rem",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  link: {
    color: "#000000",
    textDecoration: "none",
    fontSize: "0.9rem",
  },

  socials: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    color: "#000000",
  },

  bottom: {
    marginTop: "40px",
    paddingTop: "20px",

    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    fontSize: "0.85rem",
    color: "#888",
    maxWidth: "1100px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  bottomLeft: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  bottomRight: {
    textAlign: "right",
  },
};

export default Footer;
