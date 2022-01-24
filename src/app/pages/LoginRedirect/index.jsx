import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// Custom imports
import "./loadingRedirect.scss";
import { LoadingShort } from "../../components/Loading";
import { Context } from "../../../Context";
import { LOGIN_SUCCESS } from "../../reducer/types";


import {
  firebase_app as fb,
  currentUser,
  isSignEmailLink,
} from "../../firebase";

import firebase from "firebase";

const LoginRedirect = () => {
  const [getuId, setGetuId] = useState(null);
  const { state, dispatch } = useContext(Context);

  const history = useHistory();

  const locationUrl = window.location.search;

  useEffect(() => {
    console.log("locationUrl = ", locationUrl);

    // http://localhost:3008/?apiKey=AIzaSyALz_KOGWZ3cFunjD8Y1PebrmFiEV3IwCY&oobCode=m4NseK0p5Gg1z9Vy-uxrf8BAC2PEHAHepdtGlf9ee-IAAAF4hwCa5A&mode=signIn&lang=en

    if (locationUrl) {
      const getEmailId = locationUrl.split("?")[1].split("&")[0].split("=")[1];
      const getuId = locationUrl.split("?")[1].split("&")[1].split("=")[1];

      console.log("Get Email Id = ", getEmailId);
      console.log("Get UserId = ", getuId);

      //alert("Your Email id = " + getEmailId);
      //alert("Your uId = " + getuId);

      setGetuId(getuId);

         /*  setTimeout(() => {
        history.push("/");
      }, 1000); */
    }


    if (fb.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = localStorage.getItem("email");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          const currentUser = firebase.auth().currentUser;
          console.log("Current user - ", currentUser);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              name: currentUser.displayName ? currentUser.displayName : null,
              email: currentUser.email ? currentUser.email : null,
            },
          });

          setTimeout(() => {
            history.push("/");
          }, 1000);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.

          console.log('Redirect error - ', error);
        });
    }

    /* setTimeout(() => {
      if (getuId !== null) {
        history.push("/auth/login");
      }
    }, 700); */
  }, []);

  return (
    <div className="full-width page">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
            <div className="full-width bg-primary rounded px-2 pt-3 pb-5 mt-1">
              <div className="redirecting-block full-width">
                <div className="loadingCircles">
                  <LoadingShort />
                </div>{" "}
                <div className="redirect-text">
                  One Moment! Redirecting to your Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRedirect;
