import { FaTiktok, FaInstagram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FiSend } from "react-icons/fi";

const Contact = () => {

    
  return (
    <div id="contact-us" style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Got questions, partnerships, or support requests? We usually respond within 24 hours.
        </p>

        <div style={styles.grid}>
          {/* Form */}
          <form style={styles.form}>
            <input type="text" placeholder="Your Name" style={styles.input} />
            <input type="email" placeholder="Your Email" style={styles.input} />
            <textarea placeholder="Your Message" rows="5" style={styles.textarea}></textarea>

            <button type="submit" style={styles.button}>
              Send Message <FiSend size={16} />
            </button>
          </form>

          {/* Contact Info */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Reach Us Directly</h3>

            <div style={styles.infoItem}>
              <HiMail size={18} />
              <span>support@clusterclear.com</span>
            </div>

            <div style={styles.infoItem}>
              <FaTiktok size={18} />
              <span>@clusterclear</span>
            </div>

            <div style={styles.infoItem}>
              <FaInstagram size={18} />
              <span>@clusterclear</span>
            </div>

            <p style={styles.note}>
              We value serious collaboration only. No spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f9f9fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },

  container: {
    width: "100%",
    maxWidth: "1000px",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#111",
  },

  subtitle: {
    color: "#666",
    marginBottom: "40px",
   width: "100%",
  },

grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
},

  form: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
  },

  textarea: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    resize: "none",
  },

  button: {
    background: "#6355FE",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "bold",
  },

  infoBox: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },

  infoTitle: {
    marginBottom: "20px",
    color: "#111",
  },

  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    color: "#444",
  },

  note: {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#888",
    fontStyle: "italic",
  },
};

export default Contact;
