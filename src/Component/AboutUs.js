import { Shield, Zap, MessageCircle, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div id="about-us" style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>About ClusterClear</h2>

        <p style={styles.subtitle}>
          ClusterClear is built to remove noise from creator communication. We
          help creators value their time and connect only with people who are
          serious about collaboration.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <Shield size={20} color="#6355FE" />
            <h3>Trust First</h3>
            <p>Every interaction is designed to be intentional and secure.</p>
          </div>

          <div style={styles.card}>
            <Zap size={20} color="#6355FE" />
            <h3>Value Time</h3>
            <p>Creators set a price so only serious people can reach them.</p>
          </div>

          <div style={styles.card}>
            <MessageCircle size={20} color="#6355FE" />
            <h3>Real Conversations</h3>
            <p>No spam, no random DMs — only meaningful discussions.</p>
          </div>

          <div style={styles.card}>
            <Users size={20} color="#6355FE" />
            <h3>Built for Growth</h3>
            <p>Helping creators and brands collaborate more efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: "white",
    color: "black",
    padding: "80px 20px",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    maxWidth: "900px",
    textAlign: "center",
  },

  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "50px",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
};

export default AboutUs;