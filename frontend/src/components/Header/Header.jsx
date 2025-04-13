import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user?.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      {/* Preloader Start  */}
      <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
          <div className="preloader-inner position-relative">
            <div className="preloader-circle"></div>
            <div className="preloader-img pere-text">
              <img src="/assets/img/logo/logo.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* Preloader Start  */}
      <header>
        {/* Header Start  */}
        <div className="header-area header-transparrent">
          <div className="headder-top header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-2">
                  {/* Logo  */}
                  <div className="logo">
                    <Link to="/">
                      <img src={`/assets/img/logo/logo.png`} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9">
                  <div className="menu-wrapper">
                    {/* Main-menu  */}
                    <div className="main-menu">
                      <nav className="d-none d-lg-block">
                        {user?.role == "employer" ? (
                          <ul id="navigation">
                            <li>
                              <Link to="/">Home</Link>
                            </li>
                            <li>
                              <Link to="/admin/dashboard">Dashboard</Link>
                            </li>
                            <li>
                              <Link to="/admin/jobs">Jobs</Link>
                            </li>
                            <li>
                              <Link to="/admin/company">Company</Link>
                            </li>
                            <li>
                              <Link to="admin/applications">Applicants</Link>
                            </li>
                          </ul>
                        ) : (
                          <ul id="navigation">
                            <li>
                              <Link to="/">Home</Link>
                            </li>
                            <li>
                              <Link to="job-listing">Find a Jobs </Link>
                            </li>
                            <li>
                              <Link to="contact-us">About</Link>
                            </li>
                            <li>
                              <Link to="/">Page</Link>
                              <ul className="submenu">
                                <li>
                                  <Link to="blog">Blog</Link>
                                </li>
                                <li>
                                  <Link to="single-blog">Blog Details</Link>
                                </li>
                                <li>
                                  <Link to="elements">Elements</Link>
                                </li>
                                <li>
                                  <Link to="job-details">job Details</Link>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <Link to="contact-us">Contact</Link>
                            </li>
                          </ul>
                        )}
                      </nav>
                    </div>
                    {/* Header-btn  */}
                    {user ? (
                      <>
                        <div className="header-btn d-none f-right d-lg-block main-menu">
                          <ul>
                            <li style={{ padding: "20px" }}>
                              <div className="circle-icon bg-secondary text-white m-2  profile-image ">
                                {user?.name?.[0] || "U"}
                              </div>
                              <ul className="submenu">
                                <li>
                                  <Link onClick={handleLogout}> Logout </Link>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="header-btn d-none f-right d-lg-block">
                          <Link to="/register" className="btn head-btn1">
                            Register
                          </Link>
                          <Link to="/login" className="btn head-btn2">
                            Login
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Mobile Menu  */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header End  */}
      </header>
    </>
  );
};

export default Header;
