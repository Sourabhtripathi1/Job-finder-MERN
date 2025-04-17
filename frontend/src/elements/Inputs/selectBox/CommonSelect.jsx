import React, { useEffect, useRef } from "react";
import "nice-select2/dist/css/nice-select2.css";
import NiceSelect from "nice-select2";

const CommonSelect = ({
  onSelectChange = null,
  options = [],
  searchable = false,
  placeholder = "Select",
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
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
      new NiceSelect(selectRef.current, { searchable: searchable });
      selectRef.current.style.display = "none";
    }
  };

  const handleChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <>
      <select
        ref={selectRef}
        name="select"
        onChange={handleChange}
        placeholder={placeholder}
      >
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CommonSelect;
