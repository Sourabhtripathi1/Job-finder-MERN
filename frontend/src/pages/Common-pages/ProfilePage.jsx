import React, { useEffect, useState } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URI}`;

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    resume: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    toggleLoader();
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        location: user?.location || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills || [],
        resume: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      for (const key in formData) {
        if (key === "skills") {
          payload.append(key, JSON.stringify(formData[key]));
        } else {
          payload.append(key, formData[key]);
        }
      }

      const res = await axios.post(
        `${API_URL}user/update/${user._id}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");
      navigate("/my-applications");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm p-3"
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "4rem",
          padding: "3rem",
        }}>
        <h2 className="text-center mb-4 font-weight-bold">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group mt-3">
            <label>Email (readonly)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="form-control bg-light"
            />
          </div>

          <div className="form-group mt-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group mt-3">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {user?.role === "job_seeker" && (
            <>
              <div className="form-group mt-3">
                <label>Bio</label>
                <textarea
                  name="bio"
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"></textarea>
              </div>

              <div className="form-group mt-3">
                <label>
                  Skills <small className="text-muted">(comma separated)</small>
                </label>
                <input
                  type="text"
                  name="skills"
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={formData.skills.join(",")}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group mt-40">
                <label>Upload Resume</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control-file mt-2"
                />
              </div>
            </>
          )}

          <br />

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-block font-weight-bold">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
