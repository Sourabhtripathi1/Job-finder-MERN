import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { toggleLoader } from "../../../hooks/CommonFunctions";

const CitySelect = ({
  selected = "",
  onSelectChange = () => {},
  customStyles = {},
}) => {
  const [cities, setCities] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    toggleLoader(true);

    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URI}utility/city-list`)
      .then((res) => {
        const options = res.data.map((city) => ({
          value: city._id,
          label: city.name,
        }));

        setCities(options);

        if (selected) {
          const defaultCity = options.find((city) => city.value === selected);
          if (defaultCity) {
            setSelectedOption(defaultCity);
          }
        }

        toggleLoader(false);
      })
      .catch((err) => {
        console.error("Error fetching city list:", err);
        toggleLoader(false);
      });
  }, [selected]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onSelectChange(selected ? selected.value : "");
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={cities}
      placeholder="Select city"
      isClearable
      isSearchable
      styles={customStyles}
      classNamePrefix="react-select"
    />
  );
};

export default CitySelect;
