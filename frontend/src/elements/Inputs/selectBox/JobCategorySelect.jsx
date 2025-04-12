import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "nice-select2/dist/css/nice-select2.css";
import NiceSelect from "nice-select2";

const JobCategorySelect = ({ onSelectChange = () => {} }) => {
  const selectRef = useRef(null);
  const [category, setcategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URI}utility/category-list`)
      .then((res) => {
        setcategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (category.length > 0 && selectRef.current) {
      // Remove existing instance if it exists
      const prevNiceSelect = selectRef.current.nextElementSibling;
      if (prevNiceSelect && prevNiceSelect.classList.contains("nice-select")) {
        prevNiceSelect.remove();
      }

      // Initialize NiceSelect only once
      new NiceSelect(selectRef.current, { searchable: true });
      selectRef.current.style.display = "none";
    }
  }, [category]);

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <>
      <select
        ref={selectRef}
        name="select"
        onChange={handleChange}
        placholder="Select Job Category">
        {category.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default JobCategorySelect;
