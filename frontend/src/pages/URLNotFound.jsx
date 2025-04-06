import React from "react";

const URLNotFound = () => {
  return (
    <div className="slider-area ">
      <div className="slider-active">
        <div
          className="single-slider slider-height d-flex align-items-center"
          data-background={`/assets/img/hero/h1_hero.jpg`}>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-9 col-md-10">
                <div className="hero__caption">
                  <h1>
                    Sorry,
                    <br /> Page Not found
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLNotFound;
