import React, { useState, useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}application/`;

const MyApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      toggleLoader();
      const res = await axios.get(`${API_URL}my-applications`, {
        withCredentials: true,
      });
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      toggleLoader();
    }
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
                  <td>{index + 1}</td>

                  {/* Job Title */}
                  <td className="text-left">
                    <strong>{item.job?.title || "-"}</strong>
                  </td>

                  {/* Applied Date */}
                  <td>
                    {item.appliedAt
                      ? new Date(item.appliedAt).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* Company Name */}
                  <td>{item.job?.company?.name || "-"}</td>

                  {/* Application Status */}
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
    </div>
  );
};

export default MyApplication;
