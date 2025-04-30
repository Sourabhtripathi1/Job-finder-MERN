import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobSearch from "../../elements/Functionals/JobSearch/JobSearch";
import Testimonials from "../../components/Testimonials/Testimonials";

import axios from "axios";

const Home = () => {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URI}utility/category-list-jobs`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
  }, []);

  return (
    <>
      {/* Slider Area Start */}
      <div className="slider-area ">
        <div className="slider-active">
          <div
            className="single-slider slider-height d-flex align-items-center"
            data-background={`${
              import.meta.env.VITE_APP_PUBLIC_URL
            }assets/img/hero/h1_hero.jpg`}>
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-9 col-md-10">
                  <div className="hero__caption">
                    <h1>Discover Your Next Great Opportunity</h1>
                  </div>
                </div>
              </div>
              {/* Search Box */}
              <div className="row">
                <div className="col-xl-8">
                  <JobSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slider Area End */}

      {/* Featured Categories Start */}
      <div className="our-services section-pad-t30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>FEATURED JOBS</span>
                <h2>Browse Top Categories</h2>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-contnet-center">
            {Categories.map((cat) => (
              <div
                className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                key={cat._id}>
                <div className="single-services text-center mb-30">
                  <div className="services-ion">
                    <span className={cat.icon || "default-icon"}></span>
                  </div>
                  <div className="services-cap">
                    <h5>
                      <Link to={`job-listing?Category=${cat._id}`}>
                        {cat.name}
                      </Link>
                    </h5>
                    <span>({cat.jobCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="browse-btn2 text-center mt-50">
                <Link to="/job-listing" className="border-btn2">
                  Browse All Sectors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featured Categories End */}

      {/* Online CV Area Start */}
      <div
        className="online-cv cv-bg section-overly pt-90 pb-120"
        data-background={`${
          import.meta.env.VITE_APP_PUBLIC_URL
        }assets/img/gallery/cv_bg.jpg`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="cv-caption text-center">
                <p className="pera1">GET STARTED</p>
                <p className="pera2">
                  Stand out by uploading your online resume today!
                </p>
                <Link to="my-profile" className="border-btn2 border-btn4">
                  Upload your CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Online CV Area End */}

      {/* Testimonials */}
      <Testimonials />

      {/* How It Works Start */}
      <div
        className="apply-process-area apply-bg pt-150 pb-150"
        data-background={`${
          import.meta.env.VITE_APP_PUBLIC_URL
        }assets/img/gallery/how-applybg.png`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle white-text text-center">
                <span>Apply Process</span>
                <h2>How Our Platform Works</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-search"></span>
                </div>
                <div className="process-cap">
                  <h5>1. Search for Jobs</h5>
                  <p>
                    Browse thousands of openings from top companies tailored to
                    your skills and location.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-curriculum-vitae"></span>
                </div>
                <div className="process-cap">
                  <h5>2. Submit Your Application</h5>
                  <p>
                    Easily apply with a few clicks and track your application
                    status in real time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-tour"></span>
                </div>
                <div className="process-cap">
                  <h5>3. Land Your Dream Job</h5>
                  <p>
                    Connect with employers, attend interviews, and get hired at
                    your ideal workplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How It Works End */}

      {/* Support Company Start */}
      <div className="support-company-area support-padding fix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="right-caption">
                <div className="section-tittle section-tittle2">
                  <span>Empowering Careers</span>
                  <h2>24,000+ Professionals Placed in Top Roles</h2>
                </div>
                <div className="support-caption">
                  <p className="pera-top">
                    We help talented individuals find their perfect job by
                    connecting them with top employers across various
                    industries.
                  </p>
                  <p>
                    Our platform is trusted by thousands of recruiters and job
                    seekers alike. Whether you're just starting your career or
                    looking to make a big move, we provide the tools and support
                    you need.
                  </p>
                  <Link to="/admin/add/new-job" className="btn post-btn">
                    Post a Job
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="support-location-img">
                <img
                  src={`/assets/img/service/support-img.jpg`}
                  alt="support"
                />
                <div className="support-img-cap text-center">
                  <p>Since</p>
                  <span>1994</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Support Company End */}
      <br />
      <br />
    </>
  );
};

export default Home;
