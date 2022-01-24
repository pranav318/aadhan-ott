import React, { useEffect, useState } from "react";
import { PersonCircleOutline, Pencil, ChevronForward } from "react-ionicons";
import { Link, useHistory } from "react-router-dom";

// Custom import
import "./my-profile.scss";
import { firebase_app as firebase } from "../../firebase";

const MyProfile = () => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);

  const history = useHistory();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        history.push("/auth/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    setUserName(
      localStorage.getItem("name") ? localStorage.getItem("name") : null
    );
    setUserEmail(
      localStorage.getItem("email") ? localStorage.getItem("email") : null
    );

    setUserPhone(
      localStorage.getItem("phone") ? localStorage.getItem("phone") : null
    );

    return () => {};
  }, []);

  return (
    <div className="full-width">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-1">
            <div className="full-width">
              <div className="user-info-block full-width d-flex justify-content-center">
                <div className="user-info-icon">
                  <PersonCircleOutline
                    color={"#aaa"}
                    title="User"
                    height="70px"
                    width="70px"
                    cssClasses="mr-05"
                  />
                </div>
                <div className="user-name-phone-block">
                  <div className="user-name full-width">
                    <button type="button" className="userNameBtn btn">
                      {userName ? userName : "Guest User"}{" "}
                      <Pencil
                        color={"#aaa"}
                        title="Edit"
                        height="10px"
                        width="10px"
                        cssClasses="ml-05 edit-user-name"
                      />
                    </button>
                  </div>
                  {userPhone ? (
                    <div className="user-phone full-width">+91 9030130658</div>
                  ) : null}
                  {userEmail ? (
                    <div className="user-phone full-width">+91 9030130658</div>
                  ) : null}
                </div>
              </div>
              <div className="full-width subscribe-now-block mt-2">
                <div className="subscribe-now-content full-width rounded bg-secondary p-2">
                  <div className="subscribe-now-content-title full-width">
                    Watch more than 100+ movies
                  </div>
                  <div className="subscribe-now-btn-block mt-05 full-width">
                    <Link to="/subscribe" className="subscribe-now-btn">
                      Subscribe Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="full-width subscribe-now-block mt-2">
                <div className="row">
                  <div className="col12 col-md-6">
                    <button
                      type="button"
                      className="transactions-toggle-btn btn btn-secondary full-width rounded"
                    >
                      View Transactions{" "}
                      <ChevronForward
                        color={"#fff"}
                        title="View Transaction"
                        height="15px"
                        width="15px"
                        cssClasses="mr-05"
                      />
                    </button>
                  </div>
                  <div className="col12 col-md-6">
                    <button
                      type="button"
                      className="transactions-toggle-btn btn btn-secondary full-width rounded"
                      onClick={() => logout()}
                    >
                      Logout
                      <ChevronForward
                        color={"#fff"}
                        title="View Transaction"
                        height="15px"
                        width="15px"
                        cssClasses="mr-05"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
