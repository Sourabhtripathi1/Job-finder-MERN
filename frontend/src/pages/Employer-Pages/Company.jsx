import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toggleLoader } from "../../hooks/CommonFunctions";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}company/`;

const Company = () => {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      toggleLoader();
      const res = await axios.get(`${API_URL}list`, {
        withCredentials: true,
      });
      setCompanyData(res.data.companies);
    } catch (err) {
      console.error("Error fetching companies:", err);
    } finally {
      toggleLoader();
    }
  };

  return (
    <div className="container mt-50 mb-50">
      {/* Page Title & Button */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="mb-0">Company Listings</h3>
        <Link
          to="/admin/add/new-company"
          className="btn btn-success"
          style={{ zIndex: 0 }}>
          + Add New Company
        </Link>
      </div>

      {/* Company Table */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Company</th>
              <th scope="col">Active Jobs</th>
              <th scope="col" style={{ width: "25%" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {companyData.length > 0 ? (
              companyData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="text-left">
                    <div
                      className="d-flex align-items-center"
                      style={{ justifyContent: "space-around" }}>
                      <img
                        src={item.logo}
                        alt="logo"
                        className="rounded mr-2"
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "contain",
                          border: "1px solid #ddd",
                          padding: "2px",
                        }}
                      />
                      <div style={{ paddingLeft: "2rem" }}>
                        <strong>{item.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>{item.activeJobs || 0}</td>
                  <td>
                    <div
                      className="d-flex align-items-center justify-content-around"
                      style={{ justifyContent: "space-around" }}>
                      <button className="btn btn-success">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-muted py-4">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Company;
