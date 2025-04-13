import React, { useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";

const Company = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return <div></div>;
};

export default Company;
