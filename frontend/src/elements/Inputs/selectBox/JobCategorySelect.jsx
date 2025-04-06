import React, { useEffect, useRef } from "react";
import "nice-select2/dist/css/nice-select2.css";
import NiceSelect from "nice-select2";

const JobCategorySelect = ({ onSelectChange = null }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    loadCategories();
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

  const loadCategories = () => {
    console.log("Categories");
  };

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <>
      <select ref={selectRef} name="select" onChange={handleChange}>
        <option value="">All Category</option>
        <option value="">Category 1</option>
        <option value="">Category 2</option>
        <option value="">Category 3</option>
        <option value="">Category 4</option>
      </select>
    </>
  );
};

export default JobCategorySelect;
