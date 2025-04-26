import React, { useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";

const MyApplication = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return <div>MyApplication</div>;
};

export default MyApplication;
