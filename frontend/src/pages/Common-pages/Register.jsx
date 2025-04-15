import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loadUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { toggleLoader } from "../../hooks/CommonFunctions";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("sourabh");
  const [email, setEmail] = useState("sourabh@saglus.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [role, setRole] = useState("job_seeker");

  const { isLoading, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(
      registerUser({
        email,
        name,
        password,
        role,
      })
    ).then((res) => {
      if (res.type === "auth/register/fulfilled") {
        dispatch(loadUser()); // Load user from server using cookie
        toast.success("Register successful!");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    toggleLoader();
    if (user) {
      if (location.pathname === "/register") {
        toast.info("Already logged in");
      }
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4 shadow"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "3rem",
          margin: "4rem",
        }}>
        <h3 className="text-center mb-5">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>

            <div>
              <input
                type="radio"
                id="job_seeker"
                name="role"
                value="job_seeker"
                checked={role === "job_seeker"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="job_seeker" className="ms-2">
                Job Seeker
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="employer"
                name="role"
                value="employer"
                checked={role === "employer"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="employer" className="ms-2">
                Job Provider
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="btn genric-btn circle arrow">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
