import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Custom imports
import "./subscribe.scss";
import { url } from "../../components/API";

import { Close, Checkmark, ChevronForward } from "react-ionicons";
import { Rupee } from "../../components/Misc";

const Subscribe = () => {
  const [subscribe, setSubscribe] = useState(null);

  const history = useHistory();

  const getSubscribePlans = () => {
    axios.get(url + "/plans").then((res) => {
      console.log("Plans - ", res.data.plans);
      setSubscribe(res.data.plans);
    });
  };

  useEffect(() => {
    getSubscribePlans();
  }, []);

  return (
    <div className="full-width page">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className="full-width subscribe-block">
              <div className="full-width subscribe-title mb-1">
                Subscribe to get more out of RVR
              </div>
              <div className="full-width subscribe-content bg-secondary p-2 p-md-3">
                <ul className="subscribe-list list-unstyled full-width mb-0">
                  <li className="subscribe-list-header">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-2 text-center">
                        <span className="subscribe-col-title">FREE</span>
                      </div>
                      <div className="col-2 text-center">
                        <span className="subscribe-col-title orange">VIP</span>
                      </div>
                      <div className="col-2 text-center">
                        <span className="subscribe-col-title pink">
                          PREMIUM
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-6">
Lorem Ipsum is simply dummy text of the printing.
                      </div>
                      <div className="col-2 text-center">
                        <Close
                          title={"Not Available"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <Close
                          title={"Not Available"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <Checkmark
                          title={"Vailable"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-6">
                      Lorem Ipsum is  text of the printing and typesetting industry.
                      </div>
                      <div className="col-2 text-center">
                        <Close
                          title={"Not Available"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <Close
                          title={"Not Available"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <Checkmark
                          title={"Vailable"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-6">
                        Lorem Ipsum is simply dummy text of the printing and industry.
                      </div>
                      <div className="col-2 text-center">
                        <Close
                          title={"Not Available"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <Checkmark
                          title={"Vailable"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                      <div className="col-2 text-center">
                        <Checkmark
                          title={"Vailable"}
                          height="20px"
                          width="20px"
                          color="lightGray"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="full-width subscribe-plans-list mt-3">
                  {subscribe
                    ? subscribe.map((plans, index) => (
                        <label
                          className="each-subscribe-price"
                          key={index + "plnsbcr"}
                        >
                          <input
                            type="radio"
                            className="each-subscribe-price-input"
                            name="subscribeplans"
                            value={plans._id}
                          />
                          <div className="each-subscribe-price-block full-width">
                            <div className="subscribe-name full-width">
                              <span className="name-title">{plans.name}</span>
                            </div>
                            <div className="subscribe-price-duration full-width">
                              <span className="subscribe-price">
                                <span className="rupee">
                                  <Rupee />
                                </span>
                                <span className="subscribe-price-number">
                                  {plans.price}
                                </span>
                                <span className="subscirbe-days">
                                  {" "}
                                  / {plans.duration} days
                                </span>
                              </span>
                            </div>
                          </div>
                        </label>
                      ))
                    : null}
                </div>
                <div className="full-width text-center mt-1">
                  <button
                    className="btn btn-lg bg-primary continue-subscribe-btn w-100"
                    type="button"
                    onClick={() => history.push("/auth/login")}
                  >
                    Continue to Subscribe{" "}
                    <ChevronForward
                      title={"Back"}
                      height="18px"
                      width="18px"
                      color="white"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
