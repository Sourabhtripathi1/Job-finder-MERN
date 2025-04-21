import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toggleLoader } from "../../hooks/CommonFunctions";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}job/`;

const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      toggleLoader();
      const res = await axios.get(`${API_URL}list`, {
        withCredentials: true,
      });
      setJobsData(res.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      toggleLoader();
    }
  };

  const deleteJobs = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        toggleLoader();
        const res = await axios.delete(`${API_URL}delete/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success("Job deleted successfully.");
          loadJobs();  // Reload the job list after deletion
        } else {
          toast.error("Failed to delete Job.");
        }
      } catch (error) {
        console.error("Error deleting Job:", error);
        toast.error("An error occurred while deleting the Job.");
      } finally {
        toggleLoader();
      }
    }
  };

  return (
    <div className="container mt-50 mb-50">
      {/* Page Title & Button */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="mb-0">Job Listings</h3>
        <Link
          to="/admin/add/new-job"
          className="btn btn-success"
          style={{ zIndex: 0 }}
        >
          + Add New Job
        </Link>
      </div>

      {/* Job Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Job Title</th>
              <th scope="col">Company</th>
              <th scope="col">Active Jobs</th>
              <th scope="col" style={{ width: "20%" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsData.length > 0 ? (
              jobsData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="text-left">
                    <div
                      className="d-flex align-items-center"
                      style={{ justifyContent: "space-between" }}
                    >

                      <div style={{ paddingLeft: "1rem" }}>
                        <strong>{item.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>{item.activeJobs || 0}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        to={`/admin/edit-job/${item._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteJobs(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-4">
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;
