import React from "react";
import { Link } from "react-router-dom";

const JobListElement = ({ job }) => {
  if (!job) return null;

  const {
    _id = "",
    title = "Untitled Job",
    company = {},
    location = {},
    salary = {},
    jobType = "Full Time",
    createdAt = new Date().toISOString(),
  } = job;

  const logoUrl =
    company.logo ||
    `${import.meta.env.VITE_APP_PUBLIC_URL}assets/img/avatar.webp`;
  const companyName = company.name || "Unknown Company";
  const salaryCurrency = salary.currency || "₹";
  const salaryMin = salary.min ?? 0;
  const salaryMax = salary.max ?? 0;
  const locationName = location.name || "Unknown City";
  const locationState = location.state || "Unknown State";
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="single-job-items mb-30">
      <div className="job-items">
        <div className="company-img">
          <Link to={`/job-details/${_id}`}>
            <img
              src={logoUrl}
              alt="company logo"
              style={{ height: "4rem", width: "4rem" }}
            />
          </Link>
        </div>
        <div className="job-tittle job-tittle2">
          <Link to={`/job-details/${_id}`}>
            <h4>{title}</h4>
          </Link>
          <ul>
            <li>{companyName}</li>
            <li>
              <i className="fas fa-map-marker-alt" /> {locationName},{" "}
              {locationState}
            </li>
            <li>
              {salaryCurrency}
              {salaryMin} - {salaryCurrency}
              {salaryMax}
            </li>
          </ul>
        </div>
      </div>
      <div className="items-link items-link2 f-right">
        <Link to={`/job-details/${_id}`}>{jobType}</Link>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default JobListElement;
