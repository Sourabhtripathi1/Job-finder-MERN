import React from "react";

const JobListElement = () => {
  return (
    <>
      {/* single-job-content */}
      <div className="single-job-items mb-30">
        <div className="job-items">
          <div className="company-img">
            <a href="#">
              <img src="assets/img/icon/job-list1.png" alt="" />
            </a>
          </div>
          <div className="job-tittle job-tittle2">
            <a href="#">
              <h4>Digital Marketer</h4>
            </a>
            <ul>
              <li>Creative Agency</li>
              <li>
                <i className="fas fa-map-marker-alt" />
                Athens, Greece
              </li>
              <li>$3500 - $4000</li>
            </ul>
          </div>
        </div>
        <div className="items-link items-link2 f-right">
          <a href="job_details.html">Full Time</a>
          <span>7 hours ago</span>
        </div>
      </div>
      {/* single-job-content */}
    </>
  );
};

export default JobListElement;
