// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Welcome to your Dashboard</h2>
        <p>You have successfully sent an email. To send another email, click <Link to="/register">Register Another User</Link>.</p>
      </div>
    </div>
  );
}

export default Dashboard;







