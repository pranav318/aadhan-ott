import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Custom Imports
import { firebase_app as firebase } from "../firebase";
import "../../assets/styles/bootstrap/bootstrap.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import TV from "../pages/TV";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import Page404 from "../pages/Page404";
import Genre from "../pages/Genre";
import MovieDetail from "../pages/MovieDetail";
import SeriesDetail from "../pages/SeriesDetail";
import Subscribe from "../pages/Subscribe";
import LoginRedirect from "../pages/LoginRedirect";
import AboutUs from "../pages/AboutUs";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import FAQs from "../pages/FAQs";
import Search from "../pages/Search";
import Wishlist from "../pages/Wishlist";
import MyProfile from "../pages/MyProfile";

const PagesRouter = () => {
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        // ...
        setLogedIn(true);
      } else {
        // User is signed out
        // ...
        setLogedIn(false);
      }
    });
  }, []);

  return (
    <div className="full-width page" style={{ minHeight: "100vh" }}>
      <Router>
        <Header />
        <div className="full-width min-height">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tv">
              <TV />
            </Route>
            <Route exact path="/movies">
              <Movies />
            </Route>
            <Route exact path="/movies/:id">
              <MovieDetail />
            </Route>
            <Route exact path="/series">
              <Series />
            </Route>
            <Route exact path="/series/:id">
              <SeriesDetail />
            </Route>
            {/* <Route exact path="/genre/:id">
              <Genre />
            </Route>
            <Route path={"/search"}>
              <Search />
            </Route> */}

            {/* Pages */}
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/terms-conditions">
              <TermsConditions />
            </Route>
            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/faqs">
              <FAQs />
            </Route>

            {/* Authentication */}

            {/* <Route exact path="/auth/redirect">
              {logedIn ? <MyProfile /> : <LoginRedirect />}
            </Route>
            <Route exact path="/subscribe">
              <Subscribe />
            </Route>
            <Route exact path="/auth/login">
              {logedIn ? <MyProfile /> : <Login />}
            </Route>

            <Route exact path="/account/wishlist">
              {logedIn ? <Wishlist /> : <Login />}
            </Route>
            <Route exact path="/account/my-profile">
              {logedIn ? <MyProfile /> : <Login />}
            </Route> */}

            <Route component={Page404} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default PagesRouter;
