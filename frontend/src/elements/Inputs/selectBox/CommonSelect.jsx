import React, { useEffect, useState } from "react";
import Select from "react-select";

const CommonSelect = ({
  onSelectChange = null,
  options = [],
  searchable = false,
  placeholder = "Select",
  selected = null,
}) => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Convert options format: { value, title } → { value, label }
    const formattedOptions = options.map((item) => ({
      value: item.value,
      label: item.title,
    }));
    setSelectOptions(formattedOptions);

    // Handle default selection if passed
    if (selected) {
      const matchedOption = formattedOptions.find(
        (item) => item.value === selected
      );
      if (matchedOption) {
        setSelectedOption(matchedOption);
      }
    }
  }, [options, selected]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (onSelectChange) onSelectChange(selected?.value || "");
  };

  return (
    <Select
      options={selectOptions}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={searchable}
      placeholder={placeholder}
      isClearable
      classNamePrefix="react-select"
    />
  );
};

export default CommonSelect;
