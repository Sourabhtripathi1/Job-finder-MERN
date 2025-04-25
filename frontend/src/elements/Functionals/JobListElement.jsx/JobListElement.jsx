import React from "react";

const JobListElement = ({ job }) => {
  if (!job) {
    return null; // Handle cases where job data might not be available
  }

  // Destructure job properties with fallbacks for missing data
  const {
    title = "Job Title",
    company = { name: "Company Name", logo: "assets/img/icon/job-list1.png" },
    location = "Location not specified",
    salary = { min: 0, max: 0, currency: "$" },
    jobType = "Full Time",
    createdAt,
  } = job;

  // Format salary string (e.g., $3500 - $4000)
  const salaryText =
    salary.min && salary.max
      ? `${salary.currency}${salary.min} - ${salary.currency}${salary.max}`
      : "Salary not disclosed";

  // Format date (e.g., "7 hours ago" or custom logic)
  const timePosted = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "Just now";

  return (
    <div className="single-job-items mb-30">
      <div className="job-items">
        {/* Company Logo */}
        <div className="company-img">
          <a href="#">
            <img
              src={company.logo || "assets/img/icon/job-list1.png"}
              alt={`${company.name} Logo`}
            />
          </a>
        </div>

        {/* Job Details */}
        <div className="job-tittle job-tittle2">
          <a href="#">
            <h4>{title}</h4>
          </a>
          <ul>
            <li>{company.name}</li>
            <li>
              <i className="fas fa-map-marker-alt" /> {location}
            </li>
            <li>{salaryText}</li>
          </ul>
        </div>
      </div>

      {/* Job Type & Time Posted */}
      <div className="items-link items-link2 f-right">
        <a href={`/job/${job._id}`}>{jobType}</a>
        <span>{timePosted}</span>
      </div>
    </div>
  );
};

export default JobListElement;
