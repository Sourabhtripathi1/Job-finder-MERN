import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toggleLoader } from "../../hooks/CommonFunctions";

const Company = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  const countryData = [];

  return (
    <>
      <Link to="/admin/add/new-company"><button className="btn btn-primary">Add New</button></Link>

      <div className="container mt-50 mb-5">
        <div className="progress-table-wrap mt-4">
          <div className="progress-table">
            <div className="table-head d-flex font-weight-bold border-bottom py-2">
              <div className="serial col-1">S.no</div>
              <div className="country col-4">Company</div>
              <div className="visit col-3">Active Jobs</div>
              <div className="percentage col-4">Actions</div>
            </div>

            {countryData.map((item) => (
              <div
                key={item.id}
                className="table-row d-flex align-items-center py-2 border-bottom"
              >
                <div className="serial col-1">{item.id}</div>
                <div className="country col-4 d-flex align-items-center">
                  <img
                    src={item.img}
                    alt="flag"
                    style={{ width: "25px", marginRight: "10px" }}
                  />
                  {item.name}
                </div>
                <div className="visit col-3">{item.visits}</div>
                <div className="percentage col-4">
                  <div className="progress">
                    <div
                      className={`progress-bar ${item.color}`}
                      role="progressbar"
                      style={{ width: `${item.percentage}%` }}
                      aria-valuenow={item.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
