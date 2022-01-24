import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import {
  ArrowBackOutline,
  MenuOutline,
  SearchOutline,
  CloseOutline,
  PersonCircleOutline,
  ChevronDownOutline,
} from "react-ionicons";
import { debounce } from "lodash";
import axios from 'axios';

// Custom Imports
import "./header.scss";
import { firebase_app as firebase } from "../../firebase";
import {url} from '../API';
import { Rupee } from "../../components/Misc";
import { Context } from "../../../Context";
import {LOGIN_POPUP} from '../../reducer/types'

import RVRLogo from "../../../assets/images/rvr-150.png";


const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [subscribe, setSubscribe] = useState([]);
  const [userMenu, setUserMenu] = useState(false);

  const history = useHistory();
  const {state, dispatch} = useContext(Context);
  const searchTextbox = useRef();

  const searchChanged = useCallback(
    debounce((text) => {
      let value = text;
      history.push("/search?q=" + value);
    }, 500),
    []
  );

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setLogedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const mobileSearchToggle = () => {
    setMobileSearch(!mobileSearch);
    const srchTxtBox = searchTextbox.current;

    srchTxtBox.focus();

    if (srchTxtBox.value.length > 0) {
      srchTxtBox.value = "";
    } else {
    }

    console.log("Search Textbox - ", srchTxtBox.length);
  };

  const getSubscribePlans = () => {
    axios.get(url + "/plans").then(res => {
      console.log("Plans - ", res);
      setSubscribe(res.data.plans);
    }).catch(err => {
      setSubscribe([]);
    });
  };

  const loginShow = () => {
    setUserMenu(false);
    dispatch({
      type: LOGIN_POPUP,
      payload: {
        loginPopup: true
      },
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        setLogedIn(true);
      } else {
        // User is signed out
        // ...
        setLogedIn(false);
      }
    });

    // Subscription pricing
    getSubscribePlans();

  }, []);

  return (
    <header className="full-width header">
      <div className="container">
        <div className="row">
          <div className="col-7 col-md-2 col-lg-1 col-xl-1 order-0">
            <div className="branding full-width">
              <button
                className="mobile-menu-toggle-btn btn d-md-none"
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                <MenuOutline
                  cssClasses="text-gray"
                  title={"Back"}
                  height="24px"
                  width="24px"
                />
              </button>
              <Link to="/" className="branding-link" title="RVR">
                <img src={RVRLogo} alt="RVR" />
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 order-2 order-md-1">
            <div
              className={
                mobileMenu
                  ? "full-width main-nav-block show-menu"
                  : "full-width main-nav-block"
              }
            >
              <i className="mobile-nav-overlay d-md-none"></i>
              <div className="main-nav-list-block full-width">
                <button
                  className="closeMobileNavBtn btn btn-link d-md-none"
                  type="button"
                  onClick={() => setMobileMenu(!mobileMenu)}
                >
                  <CloseOutline
                    cssClasses="text-gray-2"
                    title={"Back"}
                    height="22px"
                    width="22px"
                  />
                </button>
                <ul className="main-nav-list mb-0 list-unstyled full-width">
                  {subscribe.length > 0 ? (
                    <li className="d-md-none pb-2">
                      <NavLink
                        to="/subscribe"
                        className="mobileSubscribe"
                        exact={true}
                        activeClassName="activeLink"
                        onClick={() => setMobileMenu(!mobileMenu)}
                      >
                        Try for{" "}
                        <span className="try-rupee">
                          <Rupee />
                        </span>{" "}
                        <span className="try-rupee-text">
                          {subscribe[0].price}
                        </span>{" "}
                      </NavLink>
                    </li>
                  ) : null}
                  <li>
                    <NavLink
                      exact={true}
                      to="/"
                      activeClassName="activeLink"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/movies"
                      activeClassName="activeLink"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      Movies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/series"
                      activeClassName="activeLink"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      Series
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/tv"
                      activeClassName="activeLink"
                      onClick={() => setMobileMenu(!mobileMenu)}
                    >
                      Live TV
                    </NavLink>
                  </li>
                  {logedIn ? (
                    <li>
                      <NavLink
                        exact={true}
                        to="/auth/wishlist"
                        activeClassName="activeLink"
                        onClick={() => setMobileMenu(!mobileMenu)}
                      >
                        Wishlist
                      </NavLink>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-5 col-md-4 col-lg-5 col-xl-5 order-1 order-md-2">
            <div className="full-width header-right-actions-block">
              {subscribe.length > 0 ? (
                <NavLink
                  exact={true}
                  to="/subscribe"
                  className="headerSubscribeBtn d-none d-md-inline-flex"
                  activeClassName="activeLink"
                >
                  Try for{" "}
                  <span className="try-rupee">
                    <Rupee />
                  </span>{" "}
                  <span className="try-rupee-text">{subscribe[0].price}</span>{" "}
                </NavLink>
              ) : null}
              <button
                className={
                  mobileSearch
                    ? "btn mobileHeaderSearchBtn mobile-search-active"
                    : "btn mobileHeaderSearchBtn"
                }
                type="button"
                onClick={() => mobileSearchToggle()}
              >
                <SearchOutline
                  cssClasses="text-gray-2 searchIcon"
                  title={"Back"}
                  height="20px"
                  width="20px"
                />
                <CloseOutline
                  cssClasses="text-gray-2 searchCloseIcon"
                  title={"Back"}
                  height="18px"
                  width="18px"
                />
              </button>
              <div
                className={
                  mobileSearch
                    ? "header-search-block show-mobile-search"
                    : "header-search-block"
                }
              >
                <input
                  type="text"
                  className="searchInput"
                  onChange={(e) =>
                    searchChanged(
                      e.target.value
                        .slice(0, 20)
                        .toLowerCase()
                        .replaceAll(" ", "+")
                        .replace(/[^a-z0-9'+]{1,15}/gi, "")
                    )
                  }
                  ref={(node) => (searchTextbox.current = node)}
                />
                {/* <button className="btn headerSearchBtn" type="button">
                  <SearchOutline
                    cssClasses="text-gray-2"
                    title={"Back"}
                    height="18px"
                    width="18px"
                  />
                </button> */}
              </div>

              {!logedIn ? (
                <button
                type="button"
                  className="headerLoginBtn"
                  onClick={() => loginShow()}
                >
                  Login
                </button>
              ) : (
                <div className="header-my-account">
                  <button
                    className={
                      userMenu
                        ? "btn my-account-toggle-btn open-menu"
                        : "btn my-account-toggle-btn"
                    }
                    type="button"
                    onClick={() => setUserMenu(!userMenu)}
                  >
                    <PersonCircleOutline
                      color={"#eee"}
                      title="User"
                      cssClasses="mr-05 profile-user-icon"
                    />{" "}
                    <span className="profile-user-name">My Account</span>
                  </button>
                  {userMenu ? (
                    <ul className="my-account-list list-unstyled mb-0">
                      <li>
                        <NavLink
                          to="/account/wishlist"
                          className="my-account-item-link"
                          exact={true}
                          activeClassName="my-account-active-link"
                          onClick={() => setUserMenu(false)}
                        >
                          Watchlist
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/account/my-profile"
                          className="my-account-item-link"
                          exact={true}
                          activeClassName="my-account-active-link"
                          onClick={() => setUserMenu(false)}
                        >
                          My Profile
                        </NavLink>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="my-account-item-link btn logout-btn"
                          onClick={() => logout()}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
