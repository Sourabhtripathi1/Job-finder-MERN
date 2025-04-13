import React, { useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";

const Jobs = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return <div></div>;
};

export default Jobs;
