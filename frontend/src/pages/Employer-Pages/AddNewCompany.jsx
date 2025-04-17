import React, { useActionState, useEffect, useState } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";
import CommonSelect from "../../elements/Inputs/selectBox/CommonSelect";
import CitySelect from "../../elements/Inputs/selectBox/CitySelect";

const AddNewCompany = ({editCompany = true,editID = 0}) => {
  useEffect(() => {
    toggleLoader();
  }, []);

  const cSizeOptions = [
    {
      value: "small",
      title: "Small (1-50)",
    },
    {
      value: "medium",
      title: "Medium (50-200)",
    },
    {
      value: "large",
      title: "Large (greater than 200)",
    },
  ];

  const [cName, setcName] = useState("");
  const [cDescription, setcDescription] = useState("");
  const [cAddress, setcAddress] = useState("");
  const [cSize, setcSize] = useState("small");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("")
  const [gstno, setgstno] = useState(0)


  useEffect(() => {
    
    if (editCompany) {
        loadCompanyData(editID);
    }
    
  }, [])
  

  const loadCompanyData = (id) => {
    console.log(id);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center vh-100 bg-light form-container">
        <div
          className="card shadow p-3"
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "4rem",
            padding: "3rem",
          }}
        >
          <h3 className="text-center mb-5">Add Company</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="cName"
                value={cName}
                onChange={(e) => setcName(e.target.value)}
                required
                placeholder="Enter your Company Name "
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={cDescription}
                onChange={(e) => setcDescription(e.target.value)}
                required
                placeholder="Enter your description"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gstno" className="form-label">
              GST No.
              </label>
              <input
                type="number"
                className="form-control"
                id="gstno"
                value={gstno}
                onChange={(e) => setgstno(e.target.value)}
                required
                placeholder="Enter your GST no"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter your website url"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="description"
                value={cAddress}
                onChange={(e) => setcAddress(e.target.value)}
                placeholder="Enter your description"
                rows={4}
              >
                {cAddress}
              </textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <br />
              <CitySelect onSelectChange={setLocation} />
            </div>
            <br />
            <br />

            <div className="mb-3">
              <label htmlFor="cSize" className="form-label">
                Company Size
              </label>
              <br />
              <CommonSelect
                className="form-control"
                options={cSizeOptions}
                onSelectChange={setcSize}
              />
            </div>
            <br />
            <br />

            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewCompany;
