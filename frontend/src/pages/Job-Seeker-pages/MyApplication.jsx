import React, { useState, useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}application/`;

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Show 5 items per page
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadApplications();
  }, [page]);

  const loadApplications = async () => {
    try {
      toggleLoader();
      const res = await axios.get(
        `${API_URL}my-applications?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      setApplications(res.data.applications || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      toggleLoader();
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container mt-50 mb-50">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="mb-0">My Applications</h3>
      </div>

      {/* Applications Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Job Title</th>
              <th scope="col">Applied Date</th>
              <th scope="col">Company Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((item, index) => (
                <tr key={item._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td className="text-left">
                    <strong>{item.job?.title || "-"}</strong>
                  </td>
                  <td>
                    {item.appliedAt
                      ? new Date(item.appliedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{item.job?.company?.name || "-"}</td>
                  <td>
                    {item.status ? (
                      <span
                        className={`badge ${
                          item.status === "Pending"
                            ? "badge-warning"
                            : item.status === "Accepted"
                            ? "badge-success"
                            : "badge-danger"
                        }`}
                        style={{ fontSize: "1rem" }}>
                        {item.status}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-50">
        <button
          className="btn btn-secondary mr-2"
          onClick={handlePrevious}
          disabled={page === 1}>
          Previous
        </button>
        <span className="mx-3">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-secondary ml-2"
          onClick={handleNext}
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyApplication;
