import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/job/jobSlice";

import CitySelect from "../../elements/Inputs/selectBox/CitySelect";
import JobCategorySelect from "../../elements/Inputs/selectBox/JobCategorySelect";
import CommonSelect from "../../elements/Inputs/selectBox/CommonSelect";
import PriceRangeSlider from "../../elements/Inputs/price-range-slider/PriceRangeSlider";
import JobListElement from "../../elements/Functionals/JobListElement.jsx/JobListElement";

const JobListing = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, error } = useSelector((state) => state.job);

  const [Category, setCategory] = useState(null);
  const [city, setcity] = useState(null);
  const [sortBy, setsortBy] = useState("title");
  const [salary, setsalary] = useState({ max: 0, min: 10 });
  const [jobTypes, setJobTypes] = useState({
    fullTime: false,
    partTime: false,
    remote: false,
    freelance: false,
  });
  const [experience, setExperience] = useState({ max: 0, min: 0 });

  // Fetch jobs whenever filters change
  useEffect(() => {
    const filters = {
      category: Category || "",
      city: city || "",
      sortBy,
      minSalary: salary.min,
      maxSalary: salary.max,
      minExperience: experience.min,
      maxExperience: experience.max,
      jobTypes: Object.entries(jobTypes)
        .filter(([_, v]) => v)
        .map(([k]) => k.replace(/([A-Z])/g, "-$1").toLowerCase())
        .join(","),
    };
    dispatch(fetchJobs(filters));
  }, [Category, city, sortBy, salary, experience, jobTypes, dispatch]);

  const handleJobTypeChange = (e) => {
    const { name, checked } = e.target;
    setJobTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const sortByOptions = [
    { value: "title", title: "Title" },
    { value: "date", title: "Posted date" },
  ];

  return (
    <>
      {/* Hero Area Start */}
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

      {/* Job List Area Start */}
      <div className="job-listing-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            {/* Left Sidebar */}
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="job-category-listing mb-50">
                {/* Job Category */}
                <div className="single-listing">
                  <div className="small-section-tittle2">
                    <h4>Job Category</h4>
                  </div>
                  <div className="select-job-items2">
                    <JobCategorySelect onSelectChange={setCategory} />
                  </div>

                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Job Type</h4>
                    </div>
                    {["fullTime", "partTime", "remote", "freelance"].map(
                      (type) => (
                        <label className="container" key={type}>
                          {type.replace(/([A-Z])/g, " $1")}
                          <input
                            type="checkbox"
                            name={type}
                            onChange={handleJobTypeChange}
                          />
                          <span className="checkmark" />
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Location + Experience */}
                <div className="single-listing">
                  <div className="small-section-tittle2">
                    <h4>Job Location</h4>
                  </div>
                  <div className="select-job-items2">
                    <CitySelect onSelectChange={setcity} />
                  </div>

                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Experience in years</h4>
                    </div>
                    <label>Min:</label>
                    <input
                      type="number"
                      value={experience.min}
                      onChange={(e) =>
                        setExperience((prev) => ({
                          ...prev,
                          min: Number(e.target.value),
                        }))
                      }
                    />
                    <label>Max:</label>
                    <input
                      type="number"
                      value={experience.max}
                      onChange={(e) =>
                        setExperience((prev) => ({
                          ...prev,
                          max: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Salary Range */}
                <div className="single-listing">
                  <aside className="left_widgets">
                    <div className="small-section-tittle2">
                      <h4>Filter Salary (in Lakhs)</h4>
                    </div>
                    <div className="widgets_inner">
                      <PriceRangeSlider onSliderChange={setsalary} />
                    </div>
                  </aside>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-xl-9 col-lg-9 col-md-8">
              <section className="featured-job-area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="count-job mb-35">
                        <span>{jobs.length} Jobs found</span>
                        <div className="select-job-items">
                          <span>Sort by</span>
                          <CommonSelect
                            options={sortByOptions}
                            onSelectChange={setsortBy}
                            selected={sortBy}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isLoading && <p>Loading jobs...</p>}
                  {error && <p className="text-danger">Error: {error}</p>}
                  {!isLoading &&
                    jobs.map((job, index) => (
                      <JobListElement key={index} job={job} />
                    ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Placeholder */}
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
    </>
  );
};

export default JobListing;
