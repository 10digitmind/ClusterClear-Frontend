import { Link } from "react-router-dom";
import { ShieldCheck, CreditCard, Users } from "lucide-react";

const Hero= () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.badge}>Built for serious creators & Brands</div>

      <h1 style={styles.title}>
        Stop wasting time on free messages.
        <br />
        Get paid to be contacted.
      </h1>

      <p style={styles.subtitle}>
        Set a priority fee. Only people who value your time can message you.
      </p>

      <div style={styles.buttons}>
        <Link to="/find-creators">
          <button style={styles.primaryBtn}>Find Creators</button>
        </Link>
<Link to="/signup">
          <button style={styles.secondaryBtn}>Get Started</button>
        </Link>
      </div>

      <div style={styles.trustBar}>
        <div style={styles.trustItem}>
          <ShieldCheck size={16} /> <span>Secure access</span>
        </div>

        <div style={styles.trustItem}>
          <CreditCard size={16} /> <span>Paid messages only</span>
        </div>

        <div style={styles.trustItem}>
          <Users size={16} /> <span>Built for professionals</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "90vh",
    background: "white",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },

  badge: {
    border: "1px solid #6355FE",
    color: "#6355FE",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    marginBottom: "20px",
  },

  title: {
    fontSize: "2.8rem",
    maxWidth: "700px",
    lineHeight: "1.2",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "15px",
    fontSize: "1.1rem",
    color: "#000000",
    maxWidth: "500px",
  },

  buttons: {
    marginTop: "25px",
    display: "flex",
    gap: "12px",
  },

  primaryBtn: {
    background: "#6355FE",
    color: "white",
    border: "none",
    padding: "12px 22px",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryBtn: {
    background: "transparent",
    color: "black",
    border: "1px solid #6355FE",
    padding: "12px 22px",
    cursor: "pointer",
  },

  trustBar: {
    marginTop: "30px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    color: "#aaa",
    fontSize: "0.9rem",
  },

  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 10px",
  },
};

export default Hero;
