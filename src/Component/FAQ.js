import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    q: "What is ClusterClear?",
    a: "ClusterClear is a premium platform that helps creators receive serious, high-intent messages by allowing users to prioritize communication with a small fee.",
  },
  {
    q: "How does the priority messaging work?",
    a: "Users can attach a priority fee to their message, making it more visible and increasing the chance of a response from creators.",
  },
  {
    q: "Do creators control who can message them?",
    a: "Yes. Creators can set preferences and filter messages based on priority, relevance, or user type.",
  },
  {
    q: "Is ClusterClear free to use?",
    a: "Browsing is free, but priority messaging may include small fees depending on the creator’s settings.",
  },
  {
    q: "How do payments work?",
    a: "Payments are securely processed through integrated payment providers. Funds are only used to boost message priority.",
  },
  {
    q: "Is this platform safe?",
    a: "Yes. We prioritize secure communication, spam prevention, and user verification to maintain a trusted ecosystem.",
  },
  {
    q: "How do withdrawals work?",
    a: "Withdrawals are processed securely through supported payment methods. Creators can request payouts once they meet the minimum threshold, and funds are sent within the standard processing time depending on the payment provider.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <p style={styles.subtitle}>
          Everything you need to know about how ClusterClear works.
        </p>

        <div style={styles.list}>
          {faqs.map((item, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.question} onClick={() => toggle(index)}>
                <span>{item.q}</span>
                {openIndex === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>

              {openIndex === index && (
                <div style={styles.answer}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f9f9fb",
    padding: "60px 20px",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  title: {
    fontSize: "2.5rem",
    color: "#111",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "40px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },

  question: {
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: "600",
    color: "#111",
  },

  answer: {
    padding: "18px",
    borderTop: "1px solid #eee",
    color: "#555",
    lineHeight: "1.6",
  },
};

export default FAQ;
