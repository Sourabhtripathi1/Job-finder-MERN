import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CitySelect from "../../Inputs/selectBox/CitySelect";

const JobSearch = () => {
  const navigate = useNavigate();

  const [selectedCity, setselectedCity] = useState(null);
  const [jobTitle, setjobTitle] = useState("");

  const searchJob = () => {
    navigate(`/job-listing?jobTitle=${jobTitle}&city=${selectedCity}`);
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
          <CitySelect onSelectChange={setselectedCity} />
        </div>
      </div>

      <div className="search-form">
        <a onClick={searchJob}>Find job</a>
      </div>
    </form>
  );
};

export default JobSearch;
