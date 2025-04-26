import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const JobCategorySelect = ({ onSelectChange = () => {}, selected = "" }) => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URI}utility/category-list`)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setCategories(formatted);

        // Set default selected if provided
        if (selected) {
          const match = formatted.find((opt) => opt.value === selected);
          if (match) setSelectedOption(match);
        }
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
  }, [selected]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onSelectChange(selected?.value || "");
  };

  return (
    <Select
      options={categories}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Job Category"
      isSearchable
      isClearable
      classNamePrefix="react-select"
    />
  );
};

export default JobCategorySelect;
