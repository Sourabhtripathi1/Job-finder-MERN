import React, { useState } from "react";
import CitySelect from "../../Inputs/selectBox/CitySelect";
const JobSearch = () => {
  const [selectedCity, setselectedCity] = useState(null);

  const searchJob = () => {
    console.log(selectedCity);
  };

  return (
    <form action="#" className="search-box">
      <div className="input-form">
        <input type="text" placeholder="Job Title or keyword" />
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
