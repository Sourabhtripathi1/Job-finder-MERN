import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("sourabh@saglus.com");
  const [password, setPassword] = useState("123456");
  const [role, setrole] = useState("job_seeker");

  const { isLoading, error, token, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: email,
        password: password,
        role: role,
      })
    ).then((res) => {
      if (res.type === "auth/login/fulfilled") {
        toast.success("Login successful!");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (user) {
      if (location.pathname === "/login") {
        toast.info("Already logged in");
      }
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-3"
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "4rem",
          padding: "3rem",
        }}>
        <h3 className="text-center mb-5">Login</h3>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
                onChange={(e) => setrole(e.target.value)}
              />
              <label htmlFor="job_seeker" className="ms-2">
                Job Seeker
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="job_provider"
                name="role"
                value="job_provider"
                checked={role === "job_provider"}
                onChange={(e) => setrole(e.target.value)}
              />
              <label htmlFor="job_provider" className="ms-2">
                Job Provider
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="btn genric-btn circle arrow">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
