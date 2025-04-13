import React, { useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";

const Dashboard = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return <div></div>;
};

export default Dashboard;
