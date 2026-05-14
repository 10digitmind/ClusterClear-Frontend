import '../Styles/Analytics.css';
import { useSelector } from 'react-redux';

import {
  FiMousePointer,
  FiSend,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiHash,
} from "react-icons/fi";
import { useEffect } from 'react';

export default function Analytics({ data }) {
    const user = useSelector((state) => state.auth.user);
  const {
    linkClicks = 0,
    totalRequests = 0,
    totalResponded = 0,
    averageResponseTime = 0,
    responseRate = 0,
    totalEaerned = 2000,
  } = data || {};

 

  return (
<div className="analytics">
      <h1 className="analytics-title">Analytics</h1>

      {/* Cards */}

      
      <div className="analytics-cards">
        <div className="analytics-card">
          <div className="card-icon"><FiMousePointer /></div>
          <div>
            <p className="card-label">Link Clicks</p>
            <h2 className="card-value">{user?.linkClicks}</h2>
          </div>
        </div>
   <div className="analytics-card">
          <div className="card-icon"><FiHash /></div>
          <div>
            <p className="card-label">Total Earned</p>
            <h2 className="card-value">₦{user?.wallet.totalEarned.toLocaleString()}</h2>
          </div>
        </div>
        <div className="analytics-card">
          <div className="card-icon"><FiSend /></div>
          <div>
            <p className="card-label">Total Requests</p>
            <h2 className="card-value">{user?.responses.totalRequests}</h2>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon"><FiCheckCircle /></div>
          <div>
            <p className="card-label">Responded</p>
            <h2 className="card-value">{totalResponded}</h2>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon"><FiClock /></div>
          <div>
            <p className="card-label">Avg Response Time</p>
            <h2 className="card-value">{averageResponseTime} min</h2>
          </div>
        </div>


      

        <div className="analytics-card">
          <div className="card-icon"><FiTrendingUp /></div>
          <div>
            <p className="card-label">Response Rate</p>
            <h2 className="card-value">{responseRate}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}