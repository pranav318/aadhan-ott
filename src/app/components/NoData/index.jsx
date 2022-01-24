import React from "react";

//Custom imports
import "./no-data.scss";

const NoData = () => {
  return (
    <div className="full-width d-flex align-items-center justify-content-center">
      <div className="no-data-found-block d-flex align-items-center justify-content-center text-center">
        <div className="no-data-found-text">
          Sorry!!!
          <br /> No Data Found
        </div>
      </div>
    </div>
  );
};

export default NoData;
