import React, { useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";

const Applications = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return <div>www</div>;
};

export default Applications;
