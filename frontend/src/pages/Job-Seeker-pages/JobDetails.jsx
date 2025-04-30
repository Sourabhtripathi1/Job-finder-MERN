import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { toggleLoader } from "../../hooks/CommonFunctions";
import { isUserLoggedIn } from "../../hooks/isUserLoggedIn";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI || ""}`;

const JobDetails = () => {
  const { jId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const fetchJob = async () => {
    try {
      toggleLoader(true);
      const res = await axios.get(`${API_URL}job/get/${jId}`);
      if (!res.data.success || !res.data.job) {
        toast.error("Job not found!");
        navigate("/jobs"); // or your job listing route
        return;
      }
      setJob(res.data.job);
      toggleLoader();
    } catch (err) {
      toast.error("Job not found!");
      navigate("/jobs");
    }
  };

  const applyJobs = async () => {
    try {
      const res = await axios.post(
        `${API_URL}application/apply/${jId}`,
        {},
        {
          withCredentials: true, // needed to send cookies
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error applying for job:", error);
      throw error.response?.data?.message || "Failed to apply for job.";
    }
  };

  const handleApplyJob = async () => {
    if (!isUserLoggedIn()) {
      // toast.error("Please login first to apply for a job.");
      navigate("/login");
      return;
    }

    const result = await Swal.fire({
      title: "Apply for this Job?",
      html: `
        <p>Do you want to submit your current profile or update your resume first?</p>
        <input type="file" id="resumeUpload" accept=".doc,.docx" style="display:none" />
        <button id="changeResumeBtn" class="swal2-confirm swal2-styled" style="background-color: #6c757d; margin-top: 1rem;">Change Resume</button>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit Application",
      cancelButtonText: "Update Profile",
      reverseButtons: true,
      didOpen: () => {
        const changeResumeBtn =
          Swal.getPopup().querySelector("#changeResumeBtn");
        const fileInput = Swal.getPopup().querySelector("#resumeUpload");

        changeResumeBtn.addEventListener("click", () => {
          fileInput.click();
        });

        fileInput.addEventListener("change", async (event) => {
          const selectedFile = event.target.files[0];
          if (selectedFile) {
            // You can directly upload or update the resume here
            const formData = new FormData();
            formData.append("resume", selectedFile);

            try {
              toggleLoader(true);
              await axios.post(`${API_URL}user/update/resume`, formData, {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              toast.success("Resume updated successfully!");
              toggleLoader(false);
            } catch (error) {
              toggleLoader(false);
              toast.error(
                error.response?.data?.message || "Failed to update resume."
              );
            }
          }
        });
      },
    });

    if (result.isConfirmed) {
      try {
        await applyJobs();
        toast.success("Application submitted successfully!");
      } catch (error) {
        toast.error(error || "Something went wrong while applying.");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      navigate("/my-profile");
    }
  };
  

  useEffect(() => {
    fetchJob();
  }, [jId, navigate]);

  return (
    <>
      {/* Hero Area Start */}
      <div className="slider-area ">
        <div
          className="single-slider section-overly slider-height2 d-flex align-items-center"
          data-background={`${
            import.meta.env.VITE_APP_PUBLIC_URL
          }assets/img/hero/about.jpg`}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>{job?.title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Area End */}

      <div className="job-post-company pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-between">
            {/* Left Content */}
            <div className="col-xl-7 col-lg-8">
              <div className="single-job-items mb-50">
                <div className="job-items">
                  <div className="company-img company-img-details">
                    <img
                      src={
                        job?.company?.logo ??
                        `${
                          import.meta.env.VITE_APP_PUBLIC_URL
                        }assets/img/avatar.webp`
                      }
                      alt="company logo"
                      style={{ height: "4rem", width: "4rem" }}
                    />
                  </div>
                  <div className="job-tittle">
                    <h4>{job?.title}</h4>
                    <ul>
                      <li>{job?.company?.name || "Company"}</li>
                      <li>
                        <i className="fas fa-map-marker-alt" />
                        {job?.location.name}
                      </li>
                      <li>
                        ₹{job?.salary?.min} Lac - ₹{job?.salary?.max} Lac
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="job-post-details">
                <div className="post-details1 mb-50">
                  <div className="small-section-tittle">
                    <h4>Job Description</h4>
                  </div>
                  <p>{job?.description}</p>
                </div>

                <div className="post-details2  mb-50">
                  <div className="small-section-tittle">
                    <h4>Required Skills</h4>
                  </div>
                  <ul>
                    {job?.requirements?.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div className="post-details2  mb-50">
                  <div className="small-section-tittle">
                    <h4>Experience</h4>
                  </div>
                  <ul>
                    <li>{job?.experience} years</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-xl-4 col-lg-4">
              <div className="post-details3 mb-50">
                <div className="small-section-tittle">
                  <h4>Job Overview</h4>
                </div>
                <ul>
                  <li>
                    Posted on:
                    <span>{new Date(job?.createdAt).toDateString()}</span>
                  </li>
                  <li>
                    Location:
                    <span>
                      {job?.location.name},{job?.location.state}
                    </span>
                  </li>
                  <li>
                    Vacancy: <span>{job?.vacancy || "1"}</span>
                  </li>
                  <li>
                    Job Type: <span>{job?.jobType}</span>
                  </li>
                  <li>
                    Salary:
                    <span>
                      ₹{job?.salary?.min} Lac - ₹{job?.salary?.max} Lac
                    </span>
                  </li>
                  <li>
                    Last Date:
                    <span>
                      {job?.lastDate
                        ? new Date(job?.lastDate).toDateString()
                        : "N/A"}
                    </span>
                  </li>
                </ul>
                <div className="apply-btn2">
                  <div
                    className="btn"
                    onClick={(e) => {
                      handleApplyJob();
                    }}>
                    Apply Now
                  </div>
                </div>
              </div>

              <div className="post-details4 mb-50">
                <div className="small-section-tittle">
                  <h4>Company Info</h4>
                </div>
                <span>{job?.company?.name}</span>
                <p>
                  {job?.company?.description || "No description available."}
                </p>
                <ul>
                  <li>
                    Name: <span>{job?.company?.name}</span>
                  </li>
                  <li>
                    Website: <span>{job?.company?.website || "N/A"}</span>
                  </li>
                  <li>
                    Email: <span>{job?.company?.email || "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
