import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toggleLoader } from "../../hooks/CommonFunctions";
import CommonSelect from "../../elements/Inputs/selectBox/CommonSelect";
import CitySelect from "../../elements/Inputs/selectBox/CitySelect";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}company/`;

const AddNewCompany = ({ editCompany = false }) => {
  const { cId } = useParams();

  const [cName, setcName] = useState("");
  const [cDescription, setcDescription] = useState("");
  const [cAddress, setcAddress] = useState("");
  const [cSize, setcSize] = useState("small");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [gstno, setgstno] = useState("");
  const [logo, setLogo] = useState(null);

  const cSizeOptions = [
    { value: "small", title: "Small (1-50)" },
    { value: "medium", title: "Medium (50-200)" },
    { value: "large", title: "Large (greater than 200)" },
  ];

  useEffect(() => {
    toggleLoader();
    if (editCompany && cId) {
      loadCompanyData(cId);
    }
  }, []);

  const loadCompanyData = async (id) => {
    console.log("Load company data for ID:", id);
    // Add API call to fetch and set existing data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toggleLoader(true);

      const formData = new FormData();
      formData.append("companyName", cName);
      formData.append("description", cDescription);
      formData.append("gstno", gstno);
      formData.append("website", website);
      formData.append("location", location);
      formData.append("size", cSize);
      formData.append("logo", logo);

      const response = await axios.post(`${API_URL}register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Company registered successfully.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light form-container">
      <div
        className="card shadow p-3"
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "4rem",
          padding: "3rem",
        }}>
        <h3 className="text-center mb-5">
          {editCompany ? "Edit Company" : "Add Company"}
        </h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="cName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="cName"
              value={cName}
              onChange={(e) => setcName(e.target.value)}
              required
              placeholder="Enter your Company Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={cDescription}
              onChange={(e) => setcDescription(e.target.value)}
              required
              placeholder="Enter description"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gstno" className="form-label">
              GST No.
            </label>
            <input
              type="text"
              className="form-control"
              id="gstno"
              value={gstno}
              onChange={(e) => setgstno(e.target.value)}
              required
              placeholder="Enter GST number"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="website" className="form-label">
              Website
            </label>
            <input
              type="text"
              className="form-control"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              id="address"
              value={cAddress}
              onChange={(e) => setcAddress(e.target.value)}
              placeholder="Enter address"
              rows={4}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <br />
            <CitySelect onSelectChange={setLocation} selected={location} />
          </div>
          <br />
          <br />

          <div className="mb-3">
            <label htmlFor="cSize" className="form-label">
              Company Size
            </label>
            <br />
            <CommonSelect
              options={cSizeOptions}
              onSelectChange={setcSize}
              selected={cSize}
            />
          </div>
          <br />
          <br />

          <div className="mb-3">
            <label htmlFor="logo" className="form-label">
              Company Logo
            </label>
            <input
              type="file"
              className="form-control"
              id="logo"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editCompany ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCompany;
