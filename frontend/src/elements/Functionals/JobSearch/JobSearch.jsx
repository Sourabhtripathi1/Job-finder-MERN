import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CitySelect from "../../Inputs/selectBox/CitySelect";

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "70px",
    width: "100%",
    color: "#777777",
    fontSize: "18px",
    fontWeight: "400",
    padding: "9px 5px 9px 0px",
    border: "none !important",
    borderRadius: "0px",
    position: "relative",
    boxShadow: "none !important",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#777777",
    fontSize: "18px",
    fontWeight: "400",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#777777",
    fontSize: "18px",
    fontWeight: "400",
  }),
};

const JobSearch = () => {
  const navigate = useNavigate();

  const [selectedCity, setselectedCity] = useState(null);
  const [jobTitle, setjobTitle] = useState("");

  const searchJob = () => {
    const params = new URLSearchParams();

    if (jobTitle.trim()) {
      params.append("jobTitle", jobTitle.trim());
    }

    if (selectedCity) {
      params.append("city", selectedCity);
    }

    navigate(`/job-listing?${params.toString()}`);
  };

  return (
    <form action="#" className="search-box">
      <div className="input-form">
        <input
          type="text"
          placeholder="Job Title or keyword"
          onChange={(e) => setjobTitle(e.target.value)}
        />
      </div>
      <div className="select-form">
        <div className="select-itms">
          <CitySelect
            onSelectChange={setselectedCity}
            customStyles={customStyles}
          />
        </div>
      </div>

      <div className="search-form">
        <a onClick={searchJob}>Find job</a>
      </div>
    </form>
  );
};

export default JobSearch;
