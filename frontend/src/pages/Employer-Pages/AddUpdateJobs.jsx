import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonSelect from "../../elements/Inputs/selectBox/CommonSelect";
import CitySelect from "../../elements/Inputs/selectBox/CitySelect";
import JobCategorySelect from "../../elements/Inputs/selectBox/JobCategorySelect";
import { toggleLoader } from "../../hooks/CommonFunctions";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI || ""}job/`;
const COMPANY_URL = `${import.meta.env.VITE_APP_BACKEND_URI || ""}company/list`;

const jobTypeOptions = [
  { value: "full-time", title: "Full Time" },
  { value: "part-time", title: "Part Time" },
  { value: "internship", title: "Internship" },
  { value: "contract", title: "Contract" },
];

const statusOptions = [
  { value: "1", title: "Active" },
  { value: "0", title: "Inactive" },
];

const AddUpdateJobs = ({ editJob = false }) => {
  const { jId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [category, setcategory] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("1"); // Default to Active status
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = useCallback(async () => {
    try {
      const res = await axios.get(COMPANY_URL, { withCredentials: true });
      if (res.data.success) {
        const list = res.data.companies.map((c) => ({
          value: c._id,
          title: c.name,
        }));
        setCompanies(list);
      }
    } catch (err) {
      toast.error("Failed to load companies");
    }
  }, []);

  const loadJobData = async (id) => {
    toggleLoader(true);
    try {
      const res = await axios.get(`${API_URL}get/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const job = res.data.job;
        setTitle(job.title || "");
        setDescription(job.description || "");
        setRequirements(job.requirements?.join(", ") || "");
        setLocation(job.location || "");
        setSalaryMin(job.salary?.min || "");
        setSalaryMax(job.salary?.max || "");
        setExperience(job.experience || "");
        setJobType(job.jobType || "full-time");
        setCompany(job.company?._id || "");
        setcategory(job.category?._id || "");
        setStatus(job.status?.toString() || "1"); // Set status based on job data
      } else {
        toast.error("Job not found");
      }
    } catch (error) {
      toast.error("Error loading job data");
    } finally {
      toggleLoader(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
    if (editJob && jId) {
      loadJobData(jId);
    }
  }, [editJob, jId, fetchCompanies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !category ||
      !experience ||
      !company
    ) {
      return toast.warn("Please fill in all required fields.");
    }

    try {
      toggleLoader(true);

      const data = {
        title,
        description,
        requirements: requirements
          .split(",")
          .map((req) => req.trim())
          .filter(Boolean),
        salary: {
          min: Number(salaryMin),
          max: Number(salaryMax),
        },
        location,
        category,
        jobType,
        experience,
        companyId: company,
        status: status === "1" ? 1 : 0, // Convert status to 1 (Active) or 0 (Inactive)
      };

      const url = editJob ? `${API_URL}update/${jId}` : `${API_URL}create`;
      const method = editJob ? "put" : "post";

      const res = await axios({
        method,
        url,
        data,
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(
          editJob ? "Job updated successfully." : "Job posted successfully."
        );
        navigate("/admin/jobs"); // Redirect to job list or dashboard
      } else {
        toast.error("Failed to save job");
      }
    } catch (error) {
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
        <h3 className="text-center mb-5">{editJob ? "Edit Job" : "Add Job"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter job title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              placeholder="Enter job description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Requirements (comma separated)</label>
            <input
              type="text"
              className="form-control"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="E.g. HTML, CSS, React"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <CitySelect selected={location} onSelectChange={setLocation} />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Salary Min</label>
              <input
                type="number"
                className="form-control"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="Min Salary"
              />
            </div>
            <div className="col">
              <label className="form-label">Salary Max</label>
              <input
                type="number"
                className="form-control"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="Max Salary"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Experience Level</label>
            <input
              type="text"
              className="form-control"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="E.g. 1-2 years"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job Category</label>
            <JobCategorySelect
              selected={category}
              onSelectChange={setcategory}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job Type</label>
            <CommonSelect
              options={jobTypeOptions}
              selected={jobType}
              onSelectChange={setJobType}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Company</label>
            <CommonSelect
              options={companies}
              selected={company}
              onSelectChange={setCompany}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <CommonSelect
              options={statusOptions}
              selected={status}
              onSelectChange={setStatus}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editJob ? "Update Job" : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateJobs;
