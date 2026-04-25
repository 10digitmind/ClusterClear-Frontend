import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/FindCreators.css"; // create this CSS file for styling
import Header from "./Header";
import Footer from "./Footer";

export default function FindCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const res = await axios.get("/api/creators");
      setCreators(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async (e) => {
    e.preventDefault();

    if (!email) {
      return setMessage("Enter your email");
    }

    try {
      await axios.post("/api/notify", { email });
      setMessage("We’ll notify you when creators join 🚀");
      setEmail("");
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
   <Header/>
    <div className="fc-container">
    

      {loading ? (
        <p className="fc-subtext">Loading...</p>
      ) : creators.length === 0 ? (
        // EMPTY STATE
        <div className="fc-empty">
          <p className="fc-subtext">
            We’re onboarding creators right now.
          </p>

          <button
            className="fc-primary-btn"
            onClick={() => (window.location.href = "/signup")}
          >
            Start earning as a creator
          </button>


<p style={{marginTop:'30px'}} className="fc-subtext">Get notified when creators join 🚀</p>
          <form className="fc-notify" onSubmit={handleNotify}>
            <input
              type="email"
              placeholder="Enter email to get notified"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Notify Me</button>
          </form>

          {message && <p className="fc-message">{message}</p>}
        </div>
      ) : (
        // CREATORS GRID
        <div className="fc-grid">
          {creators.map((creator) => (
            <div key={creator._id} className="fc-card">
              <img
                src={creator.avatar || "/default-avatar.png"}
                alt={creator.name}
              />
              <h3>{creator.name}</h3>
              <p className="fc-price">₦{creator.price}</p>

              <button
                onClick={() =>
                  (window.location.href = `/creator/${creator._id}`)
                }
              >
                Message
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
       </>
  );
}