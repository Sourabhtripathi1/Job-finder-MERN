import React, { useState, useEffect } from "react";
import axios from "axios";
import { toggleLoader } from "../../hooks/CommonFunctions";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    companiesCount: 0,
    jobsCount: 0,
    newApplicants: 0,
    totalUsers: 0,
    activeJobs: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        toggleLoader(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URI}utility/dashboard-stats`,
          { withCredentials: true }
        );
        setDashboardData(response.data);
        toggleLoader(false);
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
        toggleLoader(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cardStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "30px",
    textAlign: "center",
    color: "#fff",
  };

  const headerStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const cardTextStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
  };

  return (
    <div className="container mt-40 mb-50">
      <div className="row">
        {/* No of Companies Card */}
        <div className="col-md-4">
          <div style={{ ...cardStyle }}>
            <div>
              <h5 style={headerStyle}>No of Companies</h5>
              <p style={cardTextStyle}>{dashboardData.companiesCount}</p>
            </div>
          </div>
        </div>

        {/* No of Jobs Card */}
        <div className="col-md-4">
          <div style={{ ...cardStyle }}>
            <div>
              <h5 style={headerStyle}>No of Jobs</h5>
              <p style={cardTextStyle}>{dashboardData.jobsCount}</p>
            </div>
          </div>
        </div>

        {/* New Applicants Card */}
        <div className="col-md-4">
          <div style={{ ...cardStyle }}>
            <div>
              <h5 style={headerStyle}>New Applicants (Last 7 Days)</h5>
              <p style={cardTextStyle}>{dashboardData.newApplicants}</p>
            </div>
          </div>
        </div>

        {/* Total Users Registered Card */}
        <div className="col-md-4 mt-4">
          <div style={{ ...cardStyle }}>
            <div>
              <h5 style={headerStyle}>Total Users Registered</h5>
              <p style={cardTextStyle}>{dashboardData.totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Active Job Postings Card */}
        <div className="col-md-4 mt-4">
          <div style={{ ...cardStyle }}>
            <div>
              <h5 style={headerStyle}>Active Job Postings</h5>
              <p style={cardTextStyle}>{dashboardData.activeJobs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
