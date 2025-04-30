import React, { useEffect } from "react";
import Testimonials from "../../components/Testimonials/Testimonials";
import { toggleLoader } from "../../hooks/CommonFunctions";

const About = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return (
    <>
      {/* Hero Area Start */}
      <div className="slider-area ">
        <div
          className="single-slider section-overly slider-height2 d-flex align-items-center"
          data-background={`${
            import.meta.env.VITE_APP_PUBLIC_URL
          }assets/img/hero/about.jpg`}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>About us</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Area End */}

      {/* Support Company Start */}
      <div className="support-company-area fix section-padding2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="right-caption">
                <div className="section-tittle section-tittle2">
                  <span>Who We Are</span>
                  <h2>Empowering Careers, One Job at a Time</h2>
                </div>
                <div className="support-caption">
                  <p className="pera-top">
                    We connect passionate individuals with companies looking for
                    talent. Our platform has helped over 24,000 professionals
                    land their dream jobs across various industries and
                    locations.
                  </p>
                  <p>
                    At JobFinder, we believe in the power of opportunity.
                    Whether you're an experienced professional or just starting
                    out, our goal is to bridge the gap between ambition and
                    employment through innovative technology and dedicated
                    support.
                  </p>
                  <a href="/post-job" className="btn post-btn">
                    Post a Job
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="support-location-img">
                <img
                  src="assets/img/service/support-img.jpg"
                  alt="Support Team"
                />
                <div className="support-img-cap text-center">
                  <p>Founded</p>
                  <span>1994</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Support Company End */}

      {/* How Apply Process Start */}
      <div
        className="apply-process-area apply-bg pt-150 pb-150"
        data-background={`${
          import.meta.env.VITE_APP_PUBLIC_URL
        }assets/img/gallery/how-applybg.png`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle white-text text-center">
                <span>Application Process</span>
                <h2>How It Works</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-search" />
                </div>
                <div className="process-cap">
                  <h5>1. Search for Jobs</h5>
                  <p>
                    Browse through thousands of job listings tailored to your
                    skills and interests across various industries and
                    locations.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-curriculum-vitae" />
                </div>
                <div className="process-cap">
                  <h5>2. Submit Your Application</h5>
                  <p>
                    Apply with your resume and a customized cover letter to
                    stand out to potential employers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-tour" />
                </div>
                <div className="process-cap">
                  <h5>3. Get Hired</h5>
                  <p>
                    Once selected, attend interviews and take the next step in
                    your professional journey with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How Apply Process End */}

      {/* Testimonial Start */}
      <Testimonials />
      {/* Testimonial End */}

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
                <p className="pera1">Featured Talent Showcase</p>
                <p className="pera2">
                  Boost Your Chances with a Professional Resume
                </p>
                <a href="/upload-cv" className="border-btn2 border-btn4">
                  Upload Your CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Online CV Area End */}
    </>
  );
};

export default About;
