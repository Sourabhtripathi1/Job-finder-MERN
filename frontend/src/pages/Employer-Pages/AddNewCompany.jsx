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
    try {
      const res = await axios.get(`${API_URL}get/${id}`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.company) {
        const company = res.data.company;
        setcName(company.name || "");
        setcDescription(company.description || "");
        setgstno(company.gstno || "");
        setWebsite(company.website || "");
        setLocation(company.location || "");
        setcSize(company.size || "small");
        setcAddress(company.address || "");
        setLogo(null); // don't preload file input
      } else {
        toast.error("Failed to load company data");
      }
    } catch (error) {
      console.error("Error loading company data:", error);
      toast.error("Something went wrong while loading company details");
    } finally {
      toggleLoader(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toggleLoader(true);

      const formData = new FormData();
      formData.append("name", cName);
      formData.append("description", cDescription);
      formData.append("gstno", gstno);
      formData.append("website", website);
      formData.append("location", location);
      formData.append("size", cSize);
      formData.append("address", cAddress);
      if (logo) formData.append("logo", logo);

      const url = editCompany
        ? `${API_URL}update/${cId}`
        : `${API_URL}register`;

      const method = editCompany ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(
          editCompany
            ? "Company updated successfully."
            : "Company added successfully."
        );
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
          maxWidth: "800px",
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
              rows={4}>
              {cAddress}
            </textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <br />
            <CitySelect selected={location} onSelectChange={setLocation} />
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
