import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("sourabh");
  const [email, setEmail] = useState("sourabh@saglus.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");

  const { isLoading, error, token, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(
      registerUser({
        email: email,
        name: name,
        password: password,
        role: "job_seeker",
      })
    ).then((res) => {
      if (res.type === "auth/register/fulfilled") {
        toast.success("Register successful!");
        navigate("/");
      } else {
        toast.error(res?.error?.message || "Register failed");
        // navigate("/login");
      }
    });
  };

  useEffect(() => {
    if (user) {
      if (location.pathname === "/register") {
        toast.info("Already logged in");
      }
      navigate("/");
    }
  }, [user]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message || "Login failed");
  //   }
  // }, [error]);

  // useEffect(() => {
  //   toggleLoader(isLoading);
  // }, [isLoading]);

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

          <button type="submit" className="btn btn-success w-100">
            Create Account
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="btn genric-btn circle arrow">
            Login{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
