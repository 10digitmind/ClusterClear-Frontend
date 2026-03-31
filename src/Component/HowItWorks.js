
import {  CreditCard,  Zap, MessageSquare } from "lucide-react";


const HowItWorks = () => {
  return (
    <div style={howStyles.container}>
      <h2 style={howStyles.title}>How it works</h2>

      <div style={howStyles.grid}>
        <div style={howStyles.card}>
          <Zap size={20} color="#6355FE" />
          <h3>Set your price</h3>
          <p>Creators define a priority fee for incoming messages.</p>
        </div>

        <div style={howStyles.card}>
          <CreditCard size={20} color="#6355FE" />
          <h3>Pay to connect</h3>
          <p>Users pay to send messages filtering out time-wasters.</p>
        </div>

        <div style={howStyles.card}>
          <MessageSquare size={20} color="#6355FE" />
          <h3>Start real conversations</h3>
          <p>Only serious conversations happen, no spam or noise.</p>
        </div>
      </div>
    </div>
  );
};

const howStyles = {
  container: {
    background: "white",
    color: "black",
    padding: "70px 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "40px",
    fontWeight: "700",
  },
  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: "250px",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
};

export default HowItWorks;