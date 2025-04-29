import React, { useEffect, useState } from "react";
import axios from "axios";
import { toggleLoader } from "../../hooks/CommonFunctions";
import CommonSelect from "../../elements/Inputs/selectBox/CommonSelect";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}`;

const Applications = () => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get(`${API_URL}company/my-companies`, {
          withCredentials: true,
        });
        setCompanies(data.companies || []);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    toggleLoader();
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const fetchJobs = async () => {
        try {
          const { data } = await axios.get(
            `${API_URL}job/get/company/${selectedCompany}`,
            { withCredentials: true }
          );
          setJobs(data.jobs || []);
        } catch (error) {
          console.error("Error fetching jobs", error);
        }
      };
      fetchJobs();
    } else {
      setJobs([]);
    }
  }, [selectedCompany]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}application/applied-users/${selectedJob}?status=${statusFilter}&page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setApplications(data.applications || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching applications", error);
    }
  };

  useEffect(() => {
    if (selectedJob) {
      fetchApplications();
    } else {
      setApplications([]);
    }
  }, [selectedJob, statusFilter, page]);

  useEffect(() => {
    setPage(1); // Reset page when filters change
  }, [selectedJob, statusFilter]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.post(
        `${API_URL}application/update-status/${applicationId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const showProfileInAlert = (user) => {
    if (!user) {
      Swal.fire("Error", "User profile not available.", "error");
      return;
    }

    const { name, email, profile } = user;
    const { bio, skills = [] } = profile || {};

    const htmlContent = `
      <div style="text-align: left;">
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Bio:</strong> ${bio || "-"}</p>
        <p><strong>Skills:</strong> ${
          skills.length > 0 ? skills.join(", ") : "-"
        }</p>
      </div>
    `;

    Swal.fire({
      title: "Applicant Profile",
      html: htmlContent,
      icon: "info",
      confirmButtonText: "Close",
      width: 600,
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center font-weight-bold mb-4">
        Manage Job Applicants
      </h2>

      {/* Company Select */}
      <div className="form-group mb-4">
        <label htmlFor="companySelect" className="font-weight-bold">
          Select Company
        </label>
        <CommonSelect
          options={companies.map((company) => ({
            value: company._id,
            title: company.name,
          }))}
          selected={selectedCompany}
          onSelectChange={(value) => {
            setSelectedCompany(value);
            setSelectedJob("");
          }}
          placeholder="Select Company"
        />
      </div>

      {/* Job Select */}
      {selectedCompany && (
        <div className="form-group mb-4">
          <label htmlFor="jobSelect" className="font-weight-bold">
            Select Job
          </label>
          <CommonSelect
            options={jobs.map((job) => ({
              value: job._id,
              title: job.title,
            }))}
            selected={selectedJob}
            onSelectChange={setSelectedJob}
            placeholder="Select Job"
          />
        </div>
      )}

      {/* Status Filter */}
      {selectedJob && (
        <div className="form-group mb-4">
          <label htmlFor="statusFilter" className="font-weight-bold">
            Filter by Status
          </label>
          <CommonSelect
            options={[
              { value: "all", title: "All" },
              { value: "pending", title: "Pending" },
              { value: "accepted", title: "Accepted" },
              { value: "rejected", title: "Rejected" },
            ]}
            selected={statusFilter}
            onSelectChange={setStatusFilter}
            placeholder="Select Status"
          />
        </div>
      )}

      {/* Applications Table */}
      {selectedJob && (
        <div>
          <h3 className="font-weight-bold mb-3">Applicants</h3>
          {applications.length === 0 ? (
            <p>No applicants found for this job.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Applicant Name</th>
                    <th>Applied Date</th>
                    <th>View Bio</th>
                    <th>Download Resume</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="text-center">
                      <td>{app.userId?.name || "-"}</td>
                      <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td>
                        {app.userId?.profile?.bio ? (
                          <button
                            className="btn btn-link text-primary"
                            onClick={() => showProfileInAlert(app.userId)}>
                            View Bio
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {app.userId?.profile?.resume ? (
                          <a
                            href={app.userId.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-link text-success">
                            Download
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <CommonSelect
                          options={[
                            { value: "pending", title: "Pending" },
                            { value: "accepted", title: "Accepted" },
                            { value: "rejected", title: "Rejected" },
                          ]}
                          selected={app.status}
                          onSelectChange={(newStatus) =>
                            handleStatusChange(app._id, newStatus)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <button
                className="btn btn-outline-primary mx-2"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}>
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline-primary mx-2"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
