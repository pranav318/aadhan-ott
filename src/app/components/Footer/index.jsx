import React from "react";
import { Link } from "react-router-dom";

// Custom imports
import "./footer.scss";
import facebook from "../../../assets/icons/logo-facebook.svg";
import twitter from "../../../assets/icons/logo-twitter.svg";
import youtube from "../../../assets/icons/logo-youtube.svg";
import appleStore from "../../../assets/images/apple-store.svg";
import googlePlayStore from "../../../assets/images/gPlaystore.png";
import Login from "../Login";

const Footer = () => {
  return (
    <>
      <footer className="footer full-width bg-light mt-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <div className="full-width footer-links-list">
                    <Link to="/movies" className="each-footerlink">
                      Movies
                    </Link>
                    <Link to="/series" className="each-footerlink">
                      Series
                    </Link>
                    <Link to="/tv" className="each-footerlink">
                      Live TV
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="full-width footer-links-list">
                    <Link to="/about-us" className="each-footerlink">
                      About us
                    </Link>
                    <Link to="/plans" className="each-footerlink">
                      Plans
                    </Link>
                    <Link to="/contact-us" className="each-footerlink">
                      Contact us
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="full-width footer-links-list">
                    <Link to="/terms-conditions" className="each-footerlink">
                      Terms of service
                    </Link>
                    <Link to="/privacy-policy" className="each-footerlink">
                      Privacy Policy
                    </Link>
                    <Link to="/refund-cancellation" className="each-footerlink">
                      Refund &amp; Cancellation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-2 py-3 py-lg-0">
              <div className="full-width social-connect">
                <div className="full-width">Connect with us</div>
                <div className="full-width social-links-list">
                  <Link to="#" className="each-social-link">
                    <img src={facebook} alt="Facebook" />
                  </Link>
                  <Link to="#" className="each-social-link">
                    <img src={twitter} alt="Twitter" />
                  </Link>
                  <Link to="#" className="each-social-link">
                    <img src={youtube} alt="YouTube" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="full-width apps-list-block">
                <div className="full-width apps-list-title">
                  Download our app from
                </div>
                <div className="full-width apps-list-links">
                  <Link to="#" className="storeLink" title="Google Play Store">
                    <img src={googlePlayStore} alt="Google Play Store" />
                  </Link>
                  <Link to="#" className="storeLink" title="Apple Store">
                    <img src={appleStore} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4 mb-1">
              <div className="full-width copyrights text-center">
                &copy; Copyrights 2021&nbsp;&nbsp;|&nbsp;&nbsp;All Rights
                Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Login />
    </>
  );
};

export default Footer;
