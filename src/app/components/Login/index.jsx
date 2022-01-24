import React, { useState, useEffect, useRef, useContext } from "react";
import { animate, motion } from "framer-motion";
import {
  ArrowBackOutline,
  CloseCircleOutline,
  MailUnreadOutline,
  ChevronForward,
  LogoFacebook,
  LogoGoogle,
  CallOutline,
} from "react-ionicons";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";

import {
  firebase_app as firebase,
  recaptcha,
  googleProvider,
  facebookProvider,
  currentUser,
} from "../../firebase";

// Custom import
import "./login.scss";
import { Context } from "../../../Context";
import { LOGIN_SUCCESS, LOGIN_POPUP } from "../../reducer/types";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z0-9])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;

const loginValidation = Yup.object().shape({
  phone: Yup.string()
    .required("Enter your Mobile number")
    .min(10, "Must be exactly 10 characters")
    .max(10, "Must be exactly 10 characters")
    .matches(phoneRegExp, "Only numbers please"),
  country: Yup.string(),
});

const otpValidation = Yup.object().shape({
  otp: Yup.string()
    .required("Enter OTP number received on your phone")
    .min(6, "Must be exactly 6 characters")
    .max(6, "Must be exactly 6 characters")
    .matches(/^\d+$/, "Only numbers please"),
});

const loginValidations = Yup.object().shape({
  loginEmail: Yup.string()
    .email("Please enter valid Email id")
    .required("Please enter registered Email id"),
});

const Login = () => {
  const [phoneLogin, setPhoneLogin] = useState(true);
  const [otp, setOtp] = useState(false);
  const [loginEmail, setLoginEmail] = useState(false);
  const [loginPhoneNumber, setLoginPhoneNumber] = useState(null);
  const [loginPhoneError, setLoginPhoneError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [otpError, setOtpError] = useState(null);

  const history = useHistory();

  const { state, dispatch } = useContext(Context);

  const recaptchaContainer = useRef();

  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((googleRes) => {
        console.log("Google Res - ", googleRes);
        console.log(
          "Google Name - ",
          googleRes.additionalUserInfo.profile.name
        );
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            name: googleRes.additionalUserInfo.user.displayName
              ? googleRes.additionalUserInfo.user.displayName
              : null,
            email: googleRes.additionalUserInfo.profile.email
              ? googleRes.additionalUserInfo.profile.email
              : null,
          },
        });
        dispatch({
          type: LOGIN_POPUP,
          payload: {
            loginPopup: false,
          },
        });
        googleRes.user.getIdToken().then((googleUser) => {
          alert("Successfully Login! Token Id is in console log");
          console.log("Google user - ", googleUser);
        });
      })
      .catch((err) => {
        console.log("Google login error - ", err.message);
      });
  };

  const facebookLogin = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((facebookRes) => {
        console.log("Facebook Res - ", facebookRes);
        facebookRes.user.getIdToken().then((facebookUser) => {
          alert("Successfully Login! Token Id is in console log");
          console.log("Facebook login - ", facebookUser);
        });
        dispatch({
          type: LOGIN_POPUP,
          payload: {
            loginPopup: false,
          },
        });
      })
      .catch((err) => {
        console.log("Facebook login error - ", err.message);
      });
  };

  const loginWithPhoneNumber = (values) => {
    console.log("Phone number login values - ", values);
    const phoneNumber = values.country + values.phone;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptcha(recaptchaContainer.current))
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("code sent confirmation message - ", confirmationResult);
        setLoginPhoneNumber(phoneNumber);
        setOtp(true);
        setPhoneLogin(false);
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("code sent error - ", error);
        setLoginPhoneError("Something went wrong, please try again");
        recaptcha().clear();
      });
  };

  const verifyOTP = (values, { setSubmitting }) => {
    window.confirmationResult
      .confirm(values.otp)
      .then((otpVerifyRes) => {
        console.log("Veirfy Otp Res - ", otpVerifyRes);
        otpVerifyRes.user.getIdToken().then((tokenId) => {
          /* alert(
            "Successfully Verified! uId = " +
              otpVerifyRes.user.uid +
              ", & Token Id is in console log"
          ); */
          console.log("Token id - ", tokenId);
          console.log("UserId", otpVerifyRes.user.uid);
        });

        dispatch({
          type: LOGIN_POPUP,
          payload: {
            loginPopup: false,
          },
        });
      })
      .catch((err) => {
        console.log("OTP err - ", err);
        console.log(err.message);
        setOtpError("Entered OTP is wrong, Please try again!");
        setLoginPhoneError(null);
        setSubmitting(false);
      });
  };

  const loginWithEmail = (values) => {
    console.log("Got Login Details - ", values.loginEmail);

    const actionCodeSettings = {
      url: "http://rvrapi.ibee.ai/auth/redirect",
      // url: "http://localhost:3008/auth/redirect",
      handleCodeInApp: true,
    };

    console.log(actionCodeSettings.url);

    firebase
      .auth()
      .sendSignInLinkToEmail(values.loginEmail, actionCodeSettings)
      .then((loginEmailRes) => {
        console.log("Login Email Res - ", loginEmailRes);
        localStorage.setItem("email", values.loginEmail);
        setPhoneLogin(false);
        setOtp(false);
        setLoginEmail(false);
        setEmailSentSuccess(true);

        setTimeout(() => {
          history.push("/");
        }, 5000);
      })
      .catch((loginErr) => {
        console.log("Email Link Err - ", loginErr);
        setLoginError(loginErr.message);
      });
  };

  const goToPhoneLogin = () => {
    setPhoneLogin(true);
    setOtp(false);
    setLoginEmail(false);
    setOtpError(null);

  };

  const goToEmailLogin = () => {
    setPhoneLogin(false);
    setOtp(false);
    setLoginEmail(true);
  };

  const loginPopupClose = () => {
    dispatch({
      type: LOGIN_POPUP,
      payload: {
        loginPopup: false,
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0, animate);

    console.log("Ref - ", recaptchaContainer.current);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        setLogedIn(true);

        loginPopupClose();

      } else {
        // User is signed out
        // ...
        setLogedIn(false);
      }
    });

    return () => {};
  }, []);

  return (
    <div>
      {state.loginPopup ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-outer-block"
        >
          <motion.i
            className="login-outer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          ></motion.i>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="login-form-outer-block"
          >
            <div className="login-block">
              <div className="full-width login-main">
                <div className="login-form-header full-width">
                  <div className="login-title">Login</div>
                  <button
                    className="btn login-close-btn"
                    type="button"
                    onClick={() => loginPopupClose()}
                  >
                    <CloseCircleOutline color={"#999"} />
                  </button>
                </div>
                <div className="login-form-content full-width">
                  {logedIn ? (
                    <div className="full-width alreadyLoggedIn">
                      <div className="full-width loginHeading text-success">
                        You are Successfully LogedIn!
                      </div>
                      <div className="full-width text-gray">
                        This will be auto closed in 5 seconds...
                      </div>
                    </div>
                  ) : (
                    <div className="full-width login-form-block">
                      {/* Login Flow Starts */}
                      <div
                        id="recaptchaContainer"
                        ref={(node) => (recaptchaContainer.current = node)}
                      ></div>
                      {!emailSentSuccess ? (
                        <div className="full-width loginBg">
                          {/* Phone Number Form Starts */}
                          {phoneLogin ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.97 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                              className="phone-number-login full-width"
                            >
                              <div className="full-width login-intro-text">
                                New to our Webiste or Existing user
                              </div>
                              <div className="full-width loginHeading">
                                Continue with Phone !
                              </div>
                              <div className="full-width login-form-block d-flex flex-wrap justify-content-center">
                                {loginPhoneError ? (
                                  <div className="alert alert-danger">
                                    {loginPhoneError}
                                  </div>
                                ) : null}
                                <Formik
                                  enableReinitialize
                                  initialValues={{ phone: "", country: "+91" }}
                                  validationSchema={loginValidation}
                                  onSubmit={(values) => {
                                    console.log(values);
                                    loginWithPhoneNumber(values);
                                  }}
                                >
                                  {(formik) => {
                                    const {
                                      isValid,
                                      dirty,
                                      isValidating,
                                      isSubmitting,
                                    } = formik;
                                    return (
                                      <Form className="login-form mt-2">
                                        <ul className="form-list list-unstyled full-width mb-0">
                                          <li>
                                            <div className="form-item full-width">
                                              <div className="phone-country-block full-width">
                                                <select
                                                  name="country"
                                                  id="country"
                                                  className="phone-country-code"
                                                  defaultValue="+91"
                                                >
                                                  <option value="+91">
                                                    +91
                                                  </option>
                                                </select>
                                                <Field
                                                  name="phone"
                                                  id="phone"
                                                  type="tel"
                                                  className="form-control phone-input"
                                                  placeholder="Enter your phone number"
                                                />
                                              </div>
                                              <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="form-error"
                                              />
                                            </div>
                                          </li>

                                          <li>
                                            <div className="form-item full-width mt-2">
                                              <button
                                                type="submit"
                                                className="btn btn-primary submit-phone-btn full-width"
                                                id="loginSubmit"
                                                disabled={
                                                  isSubmitting
                                                    ? !loginPhoneError
                                                      ? true
                                                      : false
                                                    : false
                                                }
                                              >
                                                {isSubmitting ? (
                                                  !loginPhoneError ? (
                                                    <span>Please wait...</span>
                                                  ) : (
                                                    <span>
                                                      Continue{" "}
                                                      <ChevronForward
                                                        title={"Back"}
                                                        height="14px"
                                                        width="14px"
                                                        color="white"
                                                      />
                                                    </span>
                                                  )
                                                ) : (
                                                  <span>
                                                    Continue{" "}
                                                    <ChevronForward
                                                      title={"Back"}
                                                      height="14px"
                                                      width="14px"
                                                      color="white"
                                                    />
                                                  </span>
                                                )}
                                              </button>
                                            </div>
                                          </li>
                                        </ul>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>

                              <div className="or-block full-width text-center my-2 text-gray-2">
                                OR
                              </div>
                              <div className="login-other-methods-block full-width text-center">
                                <div className="full-width">
                                  <button
                                    className="btn toggle-other-login-methods-btn btn-lg mb-2 facebook"
                                    type="button"
                                    onClick={() => facebookLogin()}
                                  >
                                    <span className="toggle-login-method-icon">
                                      <LogoFacebook
                                        color={"#6c757d"}
                                        title={"Login with Facebook"}
                                        height="20px"
                                        width="20px"
                                        cssClasses="social-login-icon"
                                      />
                                    </span>
                                    <span className="toggle-login-method-title">
                                      Login with Facebook
                                    </span>
                                  </button>
                                </div>
                                <div className="full-width">
                                  <button
                                    className="btn toggle-other-login-methods-btn btn-lg mb-2 google"
                                    type="button"
                                    onClick={() => googleLogin()}
                                  >
                                    <span className="toggle-login-method-icon">
                                      <LogoGoogle
                                        color={"#6c757d"}
                                        title={"Login with Google"}
                                        height="20px"
                                        width="20px"
                                        cssClasses="social-login-icon"
                                      />
                                    </span>
                                    <span className="toggle-login-method-title">
                                      Login with Google
                                    </span>
                                  </button>
                                </div>
                                <div className="full-width">
                                  <button
                                    className="btn toggle-other-login-methods-btn btn-lg mb-2 email"
                                    type="button"
                                    onClick={() => goToEmailLogin()}
                                  >
                                    <span className="toggle-login-method-icon">
                                      <MailUnreadOutline
                                        color={"#6c757d"}
                                        title={"Login with Google"}
                                        height="20px"
                                        width="20px"
                                        cssClasses="social-login-icon"
                                      />
                                    </span>
                                    <span className="toggle-login-method-title">
                                      Login with Email
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                          {/* Phone Number Form Ends */}
                          {/* OTP Validation Starts */}
                          {otp ? (
                            <motion.div
                              className="otp-validation-form full-width"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              <div className="login-top-action-block text-left">
                                <button
                                  className="btn btn-link login-back-btn"
                                  type="button"
                                  onClick={() => goToPhoneLogin()}
                                >
                                  <ArrowBackOutline
                                    color={"#2f89fc"}
                                    title={"Back"}
                                    height="18px"
                                    width="18px"
                                  />
                                  &nbsp;&nbsp;Back
                                </button>
                              </div>

                              <div className="full-width login-form-block d-flex flex-wrap justify-content-center">
                                <Formik
                                  enableReinitialize
                                  initialValues={{ otp: "" }}
                                  validationSchema={otpValidation}
                                  /*  onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    verifyOTP(values.otp);
                                    loginError
                                      ? setSubmitting(false)
                                      : setSubmitting(true);

                                  }} */
                                  onSubmit={verifyOTP}
                                >
                                  {(formik) => {
                                    const {
                                      isValid,
                                      dirty,
                                      isSubmitting,
                                    } = formik;
                                    return (
                                      <Form className="login-form mt-4">
                                        <div className="full-width otp-title mb-2">
                                          Enter the 6-digit code sent to
                                          <br />
                                          {loginPhoneNumber
                                            ? loginPhoneNumber
                                            : null}
                                        </div>
                                        <ul className="form-list list-unstyled full-width mb-0">
                                          <li>
                                            <div className="form-item full-width d-flex flex-wrap">
                                              <div className="otp-block full-width">
                                                <Field
                                                  name="otp"
                                                  id="otp"
                                                  type="tel"
                                                  className="form-control login-input otp-input"
                                                  placeholder="OTP..."
                                                />
                                              </div>
                                              <ErrorMessage
                                                name="otp"
                                                component="div"
                                                className="form-error full-width"
                                              />
                                              {otpError ? (
                                                <div className="full-width text-danger otpError">
                                                  {otpError}
                                                </div>
                                              ) : null}
                                            </div>
                                          </li>

                                          <li>
                                            <div className="form-item full-width mt-2">
                                              <button
                                                type="submit"
                                                className="btn btn-primary submit-phone-btn full-width"
                                                disabled={
                                                  isSubmitting ? true : false
                                                }
                                              >
                                                {isSubmitting ? (
                                                  <span>Please wait...</span>
                                                ) : (
                                                  <span>
                                                    Continue{" "}
                                                    <ChevronForward
                                                      title={"Back"}
                                                      height="14px"
                                                      width="14px"
                                                      color="white"
                                                    />
                                                  </span>
                                                )}
                                              </button>
                                            </div>
                                          </li>
                                        </ul>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>
                            </motion.div>
                          ) : null}
                          {/* OTP Validation Ends */}
                          {/* Login  Starts */}
                          {loginEmail ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.97 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="otp-validation-form full-width"
                            >
                              <div className="full-width login-form-block d-flex flex-wrap justify-content-center">
                                <Formik
                                  enableReinitialize
                                  initialValues={{ loginEmail: "" }}
                                  validationSchema={loginValidations}
                                  onSubmit={(values) => {
                                    console.log(values);
                                    loginWithEmail(values);
                                  }}
                                >
                                  {(formik) => {
                                    const {
                                      isValid,
                                      dirty,
                                      isSubmitting,
                                    } = formik;
                                    return (
                                      <Form className="login-form">
                                        <div className="full-width login-intro-text">
                                          New to our Webiste or Existing user
                                        </div>
                                        <div className="full-width loginHeading">
                                          Continue with Email !
                                        </div>
                                        <ul className="form-list list-unstyled full-width mt-2 mb-0">
                                          {loginError ? (
                                            <li>
                                              <div className="full-width alert alert-danger">
                                                {loginError}
                                              </div>
                                            </li>
                                          ) : (
                                            ""
                                          )}
                                          <li>
                                            <div className="form-item full-width d-flex flex-wrap">
                                              <div className="full-width border-bottom border-gray">
                                                <Field
                                                  name="loginEmail"
                                                  id="loginEmail"
                                                  type="email"
                                                  className="form-control login-input"
                                                  placeholder="Enter Emaild id"
                                                />
                                              </div>
                                            </div>
                                          </li>

                                          <li>
                                            <div className="form-item full-width mt-2">
                                              <button
                                                type="submit"
                                                className="btn btn-primary submit-phone-btn full-width"
                                                disabled={
                                                  isSubmitting ? true : false
                                                }
                                              >
                                                {isSubmitting ? (
                                                  <span>Please wait...</span>
                                                ) : (
                                                  <span>
                                                    Continue{" "}
                                                    <ChevronForward
                                                      title={"Back"}
                                                      height="14px"
                                                      width="14px"
                                                      color="white"
                                                    />
                                                  </span>
                                                )}
                                              </button>
                                            </div>
                                          </li>
                                        </ul>
                                      </Form>
                                    );
                                  }}
                                </Formik>
                              </div>
                              <div className="or-block full-width text-center my-2 text-gray-2">
                                OR
                              </div>
                              <div className="social-login-block full-width text-center">
                                <div className="login-other-methods-block full-width text-center">
                                  <div className="full-width">
                                    <button
                                      className="btn toggle-other-login-methods-btn btn-lg mb-2 facebook"
                                      type="button"
                                      onClick={() => facebookLogin()}
                                    >
                                      <span className="toggle-login-method-icon">
                                        <LogoFacebook
                                          color={"#6c757d"}
                                          title={"Login with Facebook"}
                                          height="20px"
                                          width="20px"
                                          cssClasses="social-login-icon"
                                        />
                                      </span>
                                      <span className="toggle-login-method-title">
                                        Login with Facebook
                                      </span>
                                    </button>
                                  </div>
                                  <div className="full-width">
                                    <button
                                      className="btn toggle-other-login-methods-btn btn-lg mb-2 google"
                                      type="button"
                                      onClick={() => googleLogin()}
                                    >
                                      <span className="toggle-login-method-icon">
                                        <LogoGoogle
                                          color={"#6c757d"}
                                          title={"Login with Google"}
                                          height="20px"
                                          width="20px"
                                          cssClasses="social-login-icon"
                                        />
                                      </span>
                                      <span className="toggle-login-method-title">
                                        Login with Google
                                      </span>
                                    </button>
                                  </div>
                                  <div className="full-width">
                                    <button
                                      className="btn toggle-other-login-methods-btn btn-lg email"
                                      type="button"
                                      onClick={() => goToPhoneLogin()}
                                    >
                                      <span className="toggle-login-method-icon">
                                        <CallOutline
                                          color={"#6c757d"}
                                          title={"Login with Google"}
                                          height="20px"
                                          width="20px"
                                          cssClasses="social-login-icon"
                                        />
                                      </span>
                                      <span className="toggle-login-method-title">
                                        Login with Phone
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                          {/* Login  Ends */}
                        </div>
                      ) : (
                        <motion.div
                          initial={{ x: "100px", y: "100px", opacity: 0 }}
                          animate={{ x: 0, y: 0, opacity: 1 }}
                          className="otp-validation-form mt-4 full-width thanks-message bg-success rounded shadow"
                        >
                          <div className="thanks-title w-100 d-flex align-items-center">
                            <MailUnreadOutline
                              title={"Success"}
                              height="32px"
                              width="32px"
                              color="white"
                              cssClasses="mr-1"
                            />
                            AutoLogin Link sent to your email.
                          </div>
                          <div className="thanks-info mt-1 w-100">
                            We have sent you and email with Link for AutoLogin.
                            Kindly check mail, and click on Login button or copy
                            paste link in your browser.
                          </div>
                          <div className="w-100 pt-1">
                            <small>
                              <em>
                                You will be redirected to home page in 5 seconds
                              </em>
                            </small>
                          </div>
                        </motion.div>
                      )}

                      {/* Login Flow Ends */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default Login;
