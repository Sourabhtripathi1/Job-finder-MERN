import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "nice-select2/dist/css/nice-select2.css";
import NiceSelect from "nice-select2";
import { toggleLoader } from "../../../hooks/CommonFunctions";

const CitySelect = ({ onSelectChange = () => { } }) => {
  const selectRef = useRef(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    toggleLoader(true);
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URI}utility/city-list`)
      .then((res) => {
        setCities(res.data);
        toggleLoader();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (cities.length > 0 && selectRef.current) {
      // Destroy previous NiceSelect instance
      const prev = selectRef.current.nextElementSibling;
      if (prev && prev.classList.contains("nice-select")) {
        prev.remove();
      }

      new NiceSelect(selectRef.current, { searchable: true });
      selectRef.current.style.display = "none";
    }
  }, [cities]);

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <select ref={selectRef} onChange={handleChange} placeholder="Select city">
      {cities.map((city) => (
        <option key={city._id} value={city._id}>
          {city.name}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
