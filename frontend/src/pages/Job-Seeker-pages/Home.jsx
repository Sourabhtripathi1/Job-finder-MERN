import React from "react";
import { Link } from "react-router-dom";
import JobSearch from "../../elements/Functionals/JobSearch/JobSearch";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      {/* slider Area Start */}
      <div className="slider-area ">
        {/* Mobile Menu  */}
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
                    <h1>Find the most exciting startup jobs</h1>
                  </div>
                </div>
              </div>
              {/* Search Box  */}
              <div className="row">
                <div className="col-xl-8">
                  {/* form  */}
                  <JobSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* slider Area End */}

      {/* Our Services Start  */}
      <div className="our-services section-pad-t30">
        <div className="container">
          {/* Section Tittle  */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>FEATURED TOURS Packages</span>
                <h2>Browse Top Categories </h2>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-contnet-center">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-tour"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Design & Creative</Link>
                  </h5>
                  <span>(653)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-cms"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Design & Development</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-report"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Sales & Marketing</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-app"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Mobile Application</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-helmet"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Construction</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-high-tech"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Information Technology</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-real-estate"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Real Estate</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-services text-center mb-30">
                <div className="services-ion">
                  <span className="flaticon-content"></span>
                </div>
                <div className="services-cap">
                  <h5>
                    <Link to="job_listing.html">Content Writer</Link>
                  </h5>
                  <span>(658)</span>
                </div>
              </div>
            </div>
          </div>
          {/* More Btn  */}
          {/* Section Button  */}
          <div className="row">
            <div className="col-lg-12">
              <div className="browse-btn2 text-center mt-50">
                <Link to="job_listing.html" className="border-btn2">
                  Browse All Sectors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Services End  */}

      {/* Online CV Area Start  */}
      <div
        className="online-cv cv-bg section-overly pt-90 pb-120"
        data-background={`${
          import.meta.env.VITE_APP_PUBLIC_URL
        }assets/img/gallery/cv_bg.jpg`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="cv-caption text-center">
                <p className="pera1">FEATURED TOURS Packages</p>
                <p className="pera2">
                  {" "}
                  Make a Difference with Your Online Resume!
                </p>
                <Link to="#" className="border-btn2 border-btn4">
                  Upload your cv
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Online CV Area End */}

      {/* Featured_job_start  */}
      <section className="featured-job-area feature-padding">
        <div className="container">
          {/* Section Tittle  */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>Recent Job</span>
                <h2>Featured Jobs</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              {/* single-job-content  */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <Link to="job_details.html">
                      <img src={`/assets/img/icon/job-list1.png`} alt="" />
                    </Link>
                  </div>
                  <div className="job-tittle">
                    <Link to="job_details.html">
                      <h4>Digital Marketer</h4>
                    </Link>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt"></i>Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <Link to="job_details.html">Full Time</Link>
                  <span>7 hours ago</span>
                </div>
              </div>
              {/* single-job-content  */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <Link to="job_details.html">
                      <img src={`/assets/img/icon/job-list2.png`} alt="" />
                    </Link>
                  </div>
                  <div className="job-tittle">
                    <Link to="job_details.html">
                      <h4>Digital Marketer</h4>
                    </Link>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt"></i>Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <Link to="job_details.html">Full Time</Link>
                  <span>7 hours ago</span>
                </div>
              </div>
              {/* single-job-content  */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <Link to="job_details.html">
                      <img src={`/assets/img/icon/job-list3.png`} alt="" />
                    </Link>
                  </div>
                  <div className="job-tittle">
                    <Link to="job_details.html">
                      <h4>Digital Marketer</h4>
                    </Link>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt"></i>Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <Link to="job_details.html">Full Time</Link>
                  <span>7 hours ago</span>
                </div>
              </div>
              {/* single-job-content  */}
              <div className="single-job-items mb-30">
                <div className="job-items">
                  <div className="company-img">
                    <Link to="job_details.html">
                      <img src={`/assets/img/icon/job-list4.png`} alt="" />
                    </Link>
                  </div>
                  <div className="job-tittle">
                    <Link to="job_details.html">
                      <h4>Digital Marketer</h4>
                    </Link>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i className="fas fa-map-marker-alt"></i>Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
                <div className="items-link f-right">
                  <Link to="job_details.html">Full Time</Link>
                  <span>7 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured_job_end  */}

      {/* How  Apply Process Start */}
      <div
        className="apply-process-area apply-bg pt-150 pb-150"
        data-background={`${
          import.meta.env.VITE_APP_PUBLIC_URL
        }assets/img/gallery/how-applybg.png`}>
        <div className="container">
          {/* Section Tittle  */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle white-text text-center">
                <span>Apply process</span>
                <h2> How it works</h2>
              </div>
            </div>
          </div>
          {/* Apply Process Caption  */}
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-search"></span>
                </div>
                <div className="process-cap">
                  <h5>1. Search a job</h5>
                  <p>
                    Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod
                    tempor incididunt ut laborea.
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
                  <h5>2. Apply for job</h5>
                  <p>
                    Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod
                    tempor incididunt ut laborea.
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
                  <h5>3. Get your job</h5>
                  <p>
                    Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod
                    tempor incididunt ut laborea.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* How  Apply Process End */}

      {/* Testimonials Start */}
      <Testimonials />
      {/* Testimonials end */}

      {/* Support Company Start */}
      <div className="support-company-area support-padding fix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="right-caption">
                {/* Section Tittle  */}
                <div className="section-tittle section-tittle2">
                  <span>What we are doing</span>
                  <h2>24k Talented people are getting Jobs</h2>
                </div>
                <div className="support-caption">
                  <p className="pera-top">
                    Mollit anim laborum duis au dolor in voluptate velit ess
                    cillum dolore eu lore dsu quality mollit anim laborumuis au
                    dolor in voluptate velit cillum.
                  </p>
                  <p>
                    Mollit anim laborum.Duis aute irufg dhjkolohr in re
                    voluptate velit esscillumlore eu quife nrulla parihatur.
                    Excghcepteur signjnt occa cupidatat non inulpadeserunt
                    mollit aboru. temnthp incididbnt ut labore mollit anim
                    laborum suis aute.
                  </p>
                  <Link to="about.html" className="btn post-btn">
                    Post a job
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="support-location-img">
                <img src={`/assets/img/service/support-img.jpg`} alt="" />
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

      {/* Blog Area Start  */}
      <div className="home-blog-area blog-h-padding">
        <div className="container">
          {/* Section Tittle  */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle text-center">
                <span>Our latest blog</span>
                <h2>Our recent news</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src={`/assets/img/blog/home-blog1.jpg`} alt="" />
                    {/* Blog date  */}
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>| Properties</p>
                    <h3>
                      <Link to="single-blog.html">
                        Footprints in Time is perfect House in Kurashiki
                      </Link>
                    </h3>
                    <Link to="#" className="more-btn">
                      Read more »
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src={`/assets/img/blog/home-blog2.jpg`} alt="" />
                    {/* Blog date  */}
                    <div className="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div className="blog-cap">
                    <p>| Properties</p>
                    <h3>
                      <Link to="single-blog.html">
                        Footprints in Time is perfect House in Kurashiki
                      </Link>
                    </h3>
                    <Link to="#" className="more-btn">
                      Read more »
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog Area End  */}
    </>
  );
};

export default Home;
