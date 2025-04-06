import React, { useEffect, useRef } from "react";
import "nice-select2/dist/css/nice-select2.css";
import NiceSelect from "nice-select2";

const CitySelect = ({ onSelectChange = null }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    loadCities();
    loadSelect();
  }, []);

  const loadSelect = () => {
    if (selectRef.current) {
      // Remove existing instance if it exists
      const prevNiceSelect = selectRef.current.nextElementSibling;
      if (prevNiceSelect && prevNiceSelect.classList.contains("nice-select")) {
        prevNiceSelect.remove();
      }

      // Initialize NiceSelect only once
      new NiceSelect(selectRef.current, { searchable: true });
      selectRef.current.style.display = "none";
    }
  };

  const loadCities = () => {
    console.log("cities loading");
  };

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <>
      <select ref={selectRef} name="select" onChange={handleChange}>
        <option value="BD">Location BD</option>
        <option value="PK">Location PK</option>
        <option value="US">Location US</option>
        <option value="UK">Location UK</option>
      </select>
    </>
  );
};

export default CitySelect;
