import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { toggleLoader } from "../../hooks/CommonFunctions";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}company/`;

const Company = () => {
  const [companyData, setCompanyData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCompanies(page);
  }, [page]);

  const deleteCompany = async (id) => {
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
          toast.success("Company deleted successfully.");
          loadCompanies(page); // reload current page
        } else {
          toast.error("Failed to delete company.");
        }
      } catch (error) {
        console.error("Error deleting company:", error);
        toast.error("An error occurred while deleting the company.");
      } finally {
        toggleLoader();
      }
    }
  };

  const loadCompanies = async (currentPage = 1) => {
    try {
      toggleLoader();
      const res = await axios.get(
        `${API_URL}list?page=${currentPage}&limit=10`,
        {
          withCredentials: true,
        }
      );
      setCompanyData(res.data.companies);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching companies:", err);
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
                  <td>{(page - 1) * 10 + index + 1}</td>
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
                      <Link
                        to={`/admin/edit-company/${item._id}`}
                        className="btn btn-success">
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCompany(item._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-muted py-4">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-4">
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

export default Company;
