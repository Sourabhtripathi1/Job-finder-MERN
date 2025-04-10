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

  const { isLoading, error, token, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: email,
        password: password,
        role: "job_seeker",
      })
    ).then((res) => {
      if (res.type === "auth/login/fulfilled") {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(res?.error?.message || "Login failed");
        // navigate("/login");
      }

      console.log("RESA====================================");
      console.log(res);
      console.log("====================================");
    });
  };

  useEffect(() => {
    if (user) {
      if (location.pathname === "/login") {
        toast.info("Already logged in");
      }
      navigate("/");
    }
  }, []);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-3 "
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "3rem",
          margin: "4rem",
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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="btn genric-btn circle arrow">
            Register{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
