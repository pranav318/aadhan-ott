import React, {useEffect} from "react";
import "./page404.scss";

const Page404 = () => {

  useEffect(() => {
    window.scroll(0, 0, "smooth");
  }, [])
  return (
    <div className="full-width">
      <div className="page-error">
        Page 404!!! <br />
        Page Not found
      </div>
    </div>
  );
};

export default Page404;
