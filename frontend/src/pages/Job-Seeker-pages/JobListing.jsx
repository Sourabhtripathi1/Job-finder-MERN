import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CitySelect from "../../elements/Inputs/selectBox/CitySelect";
import JobCategorySelect from "../../elements/Inputs/selectBox/JobCategorySelect";
import CommonSelect from "../../elements/Inputs/selectBox/CommonSelect";
import PriceRangeSlider from "../../elements/Inputs/price-range-slider/PriceRangeSlider";
import JobListElement from "../../elements/Functionals/JobListElement.jsx/JobListElement";
import { useSearchParams } from "react-router-dom";

const JobListing = () => {
  const navigate = useNavigate();

  const [Category, setCategory] = useState(null);
  const [city, setcity] = useState(null);
  const [sortBy, setsortBy] = useState(null);
  const [salary, setsalary] = useState({ max: 0, min: 10 });
  const [jobTypes, setJobTypes] = useState({
    fullTime: false,
    partTime: false,
    remote: false,
    freelance: false,
  });
  const [experience, setExperience] = useState({ max: 0, min: 0 });

  const handleJobTypeChange = (e) => {
    const { name, checked } = e.target;
    setJobTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const [searchParams] = useSearchParams();

  const sortByOptions = [
    {
      value: "title",
      title: "Title",
    },
    {
      value: "date",
      title: "Posted date",
    },
  ];

  const filterJobs = () => {
    // console.log({
    //   Category,
    //   city,
    //   sortBy,
    //   jobTypes,
    //   experience,
    //   salary,
    // });
  };

  useEffect(() => {
    // console.log(searchParams);
    filterJobs();
  }, [searchParams]);

  useEffect(() => {
    filterJobs();
  }, [Category, sortBy, jobTypes, city, experience, salary]);

  return (
    <>
      {/* Hero Area Start*/}
      <div className="slider-area ">
        <div
          className="single-slider section-overly slider-height2 d-flex align-items-center"
          data-background="assets/img/hero/about.jpg">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>Get your job</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Area End */}
      {/* Job List Area Start */}
      <div className="job-listing-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            {/* Left content */}
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="row">
                <div className="col-12">
                  <div className="small-section-tittle2 mb-45">
                    <div className="ion">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20px"
                        height="12px">
                        <path
                          fillRule="evenodd"
                          fill="rgb(27, 207, 107)"
                          d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z"
                        />
                      </svg>
                    </div>
                    <h4>Filter Jobs</h4>
                  </div>
                </div>
              </div>
              {/* Job Category Listing start */}
              <div className="job-category-listing mb-50">
                {/* single one */}
                <div className="single-listing">
                  <div className="small-section-tittle2">
                    <h4>Job Category</h4>
                  </div>
                  {/* Select job items start */}
                  <div className="select-job-items2">
                    <JobCategorySelect onSelectChange={setCategory} />
                  </div>
                  {/*  Select job items End*/}
                  {/* select-Categories start */}
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Job Type</h4>
                    </div>
                    <label className="container">
                      Full Time
                      <input
                        type="checkbox"
                        name="fullTime"
                        onChange={handleJobTypeChange}
                      />
                      <span className="checkmark" checked={jobTypes.fullTime} />
                    </label>
                    <label className="container">
                      Part Time
                      <input
                        type="checkbox"
                        name="partTime"
                        onChange={handleJobTypeChange}
                      />
                      <span className="checkmark" checked={jobTypes.partTime} />
                    </label>
                    <label className="container">
                      Remote
                      <input
                        type="checkbox"
                        name="remote"
                        onChange={handleJobTypeChange}
                      />
                      <span className="checkmark" checked={jobTypes.remote} />
                    </label>
                    <label className="container">
                      Freelance
                      <input
                        type="checkbox"
                        name="freelance"
                        onChange={handleJobTypeChange}
                      />
                      <span
                        className="checkmark"
                        checked={jobTypes.freelance}
                      />
                    </label>
                  </div>
                  {/* select-Categories End */}
                </div>
                {/* single two */}
                <div className="single-listing">
                  <div className="small-section-tittle2">
                    <h4>Job Location</h4>
                  </div>
                  {/* Select job items start */}
                  <div className="select-job-items2">
                    <CitySelect onSelectChange={setcity} />
                  </div>
                  {/*  Select job items End*/}
                  {/* select-Categories start */}
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Experience in years</h4>
                    </div>
                    <label className="">Min:</label>
                    <input
                      type="number"
                      value={experience.min}
                      onChange={(e) =>
                        setExperience((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                    />

                    <label className="">Max: </label>
                    <input
                      type="number"
                      value={experience.max}
                      onChange={(e) =>
                        setExperience((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* select-Categories End */}
                </div>
                {/* single three */}
                {/* <div className="single-listing">
                  <div className="select-Categories pb-50">
                    <div className="small-section-tittle2">
                      <h4>Posted Within</h4>
                    </div>
                    <label className="container">
                      Any
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="container">
                      Today
                      <input type="checkbox" defaultChecked="checked active" />
                      <span className="checkmark" />
                    </label>
                    <label className="container">
                      Last 2 days
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="container">
                      Last 3 days
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="container">
                      Last 5 days
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="container">
                      Last 10 days
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div> */}
                <div className="single-listing">
                  {/* Range Slider Start */}
                  <aside className="left_widgets">
                    <div className="small-section-tittle2">
                      <h4>Filter Salary (in Lakhs)</h4>
                    </div>
                    <div className="widgets_inner">
                      <PriceRangeSlider onSliderChange={setsalary} />
                    </div>
                  </aside>
                  {/* Range Slider End */}
                </div>
              </div>
              {/* Job Category Listing End */}
            </div>
            {/* Right content */}
            <div className="col-xl-9 col-lg-9 col-md-8">
              {/* Featured_job_start */}
              <section className="featured-job-area">
                <div className="container">
                  {/* Count of Job list Start */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="count-job mb-35">
                        <span>39, 782 Jobs found</span>
                        {/* Select job items start */}
                        <div className="select-job-items">
                          <span>Sort by</span>
                          <CommonSelect
                            options={sortByOptions}
                            onSelectChange={setsortBy}
                          />
                        </div>
                        {/*  Select job items End*/}
                      </div>
                    </div>
                  </div>
                  {/* Count of Job list End */}
                  <JobListElement />
                </div>
              </section>
              {/* Featured_job_end */}
            </div>
          </div>
        </div>
      </div>
      {/* Job List Area End */}
      {/*Pagination Start  */}
      <div className="pagination-area pb-115 text-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="single-wrap d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-start">
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        01
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        02
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        03
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <span className="ti-angle-right" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Pagination End  */}
    </>
  );
};

export default JobListing;
