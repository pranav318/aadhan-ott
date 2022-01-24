import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { AddCircleOutline, Play } from "react-ionicons";
import {motion} from "framer-motion";

// custom imports
import "./tv.scss"
import { url, headers } from "../../components/API";
import { LoadingStack } from "../../components/Loading";
import { Rupee, RupeeWhite } from "../../components/Misc";

const TV = () => {
  const [subscribe, setSubscribe] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getSubscribePlans = () => {
    axios.get(url + "/plans").then((res) => {
      console.log("Plans - ", res.data.plans);
      setSubscribe(res.data.plans);
    }).catch(err => {
      setSubscribe([]);
    });
  };

  useEffect(() => {
    window.scroll(0, 0, 'smooth');

    getSubscribePlans();

    setTimeout(() => {
      setLoading(false);
    }, 700);

  }, []);

  return (
    <div className="full-width">
      {loading ? (
        <LoadingStack banner={true} />
      ) : (
        <div className="full-width tv-channels mt-3">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 col-lg-9">
                <div className="full-width subscribe-block">
                  <h1 className="heading-1 tv-channel-heading font-weight-normal text-dark text-uppercase full-width">
                    TV Channels
                  </h1>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-3">
                <div className="subscribe-price">
                  {subscribe.length > 0 ? (
                    <Link
                      to="/subscribe"
                      className="tvSubscribeBtn btn btn-primary"
                      exact={true}
                      activeClassName="activeLink"
                    >
                      Try for{" "}
                      <span className="try-rupee">
                        <RupeeWhite />
                      </span>{" "}
                      <span className="try-rupee-text">
                        {subscribe[0].price}
                      </span>
                    </Link>
                  ) : null}
                  <span className="subscribe-info">
                    For first month you can get 25% discount
                  </span>
                </div>
              </div>
            </div>

            {/* Channels Grid starts */}
            <div className="row">
              <div className="col-12">
                {/* Each Category Starts */}
                <div className="full-width channels-category mt-3">
                  <h2 className="full-width channel-category-title">
                    Entertainment
                  </h2>
                  <div className="channel category-list-block full-width">
                    <ul className="category-channels-list list-unstyled full-width mb-0">
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="data:image/jpeg;base64,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"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="data:image/jpeg;base64,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"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtW6SpaZS0bshgkQGZzWqMl74d49GQHRyVA&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 4 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkazx0gEfWjBgYlUSaIOlBhrVQaUwr28mh0w&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 5 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBscn6r8ak0TMQXDsQEsZORWUIH38KLBCvQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 6 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgGypdDPvD7xhMTxN0CJ-DuWKenqmsIq_qUQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 7 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKybPpvW7lDzJ4wFJPtviNCGzAZvbjfw8Og&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 8 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZB87nS79Zq1Z2mO0njRsxJrfG8AcfKa4jw&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 9 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ps1BT20ihgVk-kRRUETqbLkz9Aw5X7oIfQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 10 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIg83m09aAOj3g5EtyIp74gD1bDciaWUg3_A&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>

                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 11 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://static.wikia.nocookie.net/logopedia/images/1/19/Colorstv-logo-black-background.jpg"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                    </ul>
                  </div>
                </div>
                {/* Each Category Ends */}

                {/* Each Category Starts */}
                <div className="full-width channels-category mt-3">
                  <h2 className="full-width channel-category-title">
                    Movies and Series
                  </h2>
                  <div className="channel category-list-block full-width">
                    <ul className="category-channels-list list-unstyled full-width mb-0">
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="data:image/jpeg;base64,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"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="data:image/jpeg;base64,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"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtW6SpaZS0bshgkQGZzWqMl74d49GQHRyVA&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 4 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkazx0gEfWjBgYlUSaIOlBhrVQaUwr28mh0w&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 5 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBscn6r8ak0TMQXDsQEsZORWUIH38KLBCvQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 6 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgGypdDPvD7xhMTxN0CJ-DuWKenqmsIq_qUQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 7 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKybPpvW7lDzJ4wFJPtviNCGzAZvbjfw8Og&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 8 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZB87nS79Zq1Z2mO0njRsxJrfG8AcfKa4jw&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 9 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ps1BT20ihgVk-kRRUETqbLkz9Aw5X7oIfQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 10 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIg83m09aAOj3g5EtyIp74gD1bDciaWUg3_A&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>

                      <motion.li
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 11 / 10 }}
                      >
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://static.wikia.nocookie.net/logopedia/images/1/19/Colorstv-logo-black-background.jpg"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </motion.li>
                    </ul>
                  </div>
                </div>
                {/* Each Category Ends */}

                {/* Each Category Starts */}
                <div className="full-width channels-category mt-3">
                  <h2 className="full-width channel-category-title">
                    Documentary
                  </h2>
                  <div className="channel category-list-block full-width">
                    <ul className="category-channels-list list-unstyled full-width mb-0">
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhISEBIVFRUWGBUVFRUXGBUXGhcVFRgYFxUXFhcaHyghGBslHRUXITIlJSkrLi4vGB8zODMtNyotMSsBCgoKDg0OGxAQGzAlICUuKy03MC0rNS0tLS0tMjEtKy0tLS03LS0tLS0tLS0rLS0tLS0tLy0tLTAtLS0rLS0uLf/AABEIANEA8QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBwgEAgH/xABHEAABAwIBBQoKCAUEAwAAAAABAAIDBBEFBhIhMUEHEzJRVHFykbGyCBQWFyIjUmGS0RU0NVNzgaHBJDNCdMKTs+HwJUNi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQYCAf/EADkRAAIBAgEIBggHAQEBAAAAAAABAgMRBAUSITFhcZGxFDNBUYGSEyIyYqHB4vAjJDRSctHhQvEV/9oADAMBAAIRAxEAPwDeKIiAIiIAiIgMckjWi7iAOMrH4zH7besLJIwOBa4XB0EKr4nSyU5uPSjOq+z3E/uqGNxFahHPhFSj267rbu5biejTjUea3Zll8Zj9pvWF+eMs9tvWFVYatrvcff8ANekLLWW6n7FxZM8IlrbLH41H7Y608Zj9sdYVeCytUkcrzf8AwvieXh13k7v7PaHWm/t9odarFZi0MOhzru9kaT+fF+a89BWT1b7RDMYOE7WQOfj9wViOUZyaio3b7Dw6CSvcuDJGnUQba19OcALnUFipadsbQ1urj2k7STtKzrVjnW9bWV3bsPOKqP229a/fGWe03rCr2N4Y+O81Nzvj1j3uaO0BRlLizHaHeiePWP8AhY+JyjXoTzZQW+70/fwLkMLGcc6LvzRc/GWe23rC/fGo/bHWq41wOkaQvoKustVH/wALix0aPeWLxmP2x1hPGGe0FAtX5NVMjHpuA9238gpo5Vm9cUeHQXeWDf2+0OtBK0mwIvxXVSbib5XBkDdJ1E6+fiAVlw+iEQ0nOeeE49g4greGxc68tEdC1v5LvfIjnTUe09qIi0SIIiIAiIgCIiAIiIAiIgCIiALFLG1wLXAEHQQVlRfGr6wUfGqDxd4AN2uuW8Y4wV5YapzdR0cRUtlkfTi5ndoUBnLkMbSjTryhFaE+aT+ZuUG50k5fem3yPViGUUcDM57XEk2AFtJ16zqGhViuyqnm0A7232W6/wA3az+Vl+ZX6Y4+n/iVV2vIU+FoxcM7tIqkUpWRa8ApDVTMhDs3OuS7XYAXPOdC25h9DHAwRxizR1k7STtK1Juby3r4h/8AMncK3KtrA0oqLlbT/wCFDEN3sERFfK4VMyqwdsXr47AE2c33na35K5qByzP8MekztVTHU4zoSzlqTa2Ms4SbjVil26CnU1U5nBNvds6lJx4w0Al4Oji2/koFjl+1D/Qd/wB2rlnC7NipBNNs99Tjz3aGDMHHrPXsXiY8uOu5JA08Z4yo5si9VG/02dJvaFLmdhSNl4NhTadvG88J37DiCk0RdbCnGms2K0IzG23dhERej4EREAREQBERAEREAREQBERAEREBUstD6cXRd2hVzOVhy3PpRdF3aFW7rlcoL8zPw5I3MJ1MfvtZEZVaY2dP/EqsEKz5SaY2dL9iq6QpsNop8TzV9osW5oP/ACEXRk7hW6lpjc2H/kIujJ3CtzrawfV+JmYn2/AIiK0QBV/Lb6qekztVgUFlg29Mek3tUGK6ie58ibD9bHejXjHJVP8AQd/3av2Rll56x3q3c37hcxm6UdBOzi9x42yL2UUnps6Te0KJbIvZRSesj6Te0Kxm6UZpvFERdO9ZlhERfAEREAREQBERAEREAREQBERAEREBTcuj6cPM7tCrV1Y8vT6UPM7tCq91zGPX5ifhyRvYTqI+PNngx/SxvS/YqFhgc9wYxpc46ABpJVjqqMzZrc5rRe5c7UBbX71ZMGjoqVtmSNLjwnnhH5D3BeIVVCFtbI67tIwZJ5NmlcJ5HetsQAOCwOFj0jb8u1WvxyT2v0CjfpWD71qfSsH3rVF0it2Sa3NrkU5Rcndr4El45J7X6BPHJPa/QKN+lYPvWp9KwfetTpFf98vM/wCz56PZ8CS8ck9r9AsFcTMwseTY6dmsal5PpWD71qfSsH3rUdes9DnLzP8As+qFndL4FfxHD3RnTpGw7P8AgqDxRto3837hXl+JU5BBkaQdYKq+VEMW8yOhkDhbg7RpHWF9pyvJXLtOs2mpIp7ZF7KCT1kfTZ3golr17MPk9ZH02d4LQzdKIDoVERbzMsIiIAiIgCIiAIiIAiIgCIiAIiIAiIgKTl8fTh6Lu1Va6tG6APTh6L+0Kprm8cvzEvDkjoMGvwI+PNmeF2lfMsdtI1diw59llZKqlnrI6ztUPlFmhpnyODY2lxP9I16Na9X0FV/cO6lJGE5K6Te5M858e1keikPoKr+4d1J9BVf3DupffRVP2vgxnx71xI9FIfQVX9w7qWOfCaiMZz4nNGq5GjSjpzSu4vgwpxehM8kbC42Cy4vEGU0oGuwufzC9EDQ0aFgxw/w8vMO0KspXnFbUTONosoyz0H82Pps7wWKyzUI9bH02d4LYT0lM6LREW2ZYREQBERAEREAREQBERAERQ+VVW+CllljNnszCDa/9bb6NtxcL43ZXPdKm6k4wWttLjoJhFB5N4/HWx3FmyN4bOI8Y42njU4iaauhUpzpzcJqzQREX08FMy8bd8PRd2hVUsVvy2bd8XRd2hVgsXO43r5eHJG3hJfgx8ebI2tOaBzrAyVZsc9Frel+xUUyVRRheJ8q6ZFyyKkvVx8z+6VstaqyCkvWR8z+6VtVbOT1ak9/yRmYj2/AIiK8QBQWWB/hj0m9qnVA5Zn+GPSZ2qvi+onufImw3XR3oo7XLz4yfUScw7QvtrlgxY+pk5h2hctFeut6N2S9VlSsstEPWR9NneC+LLNQj1kfTZ3gtVayk9R0OiItwyQiIgCIiAIiIAiIgCIiAKBy4+o1HM3vtU8oHLj6jUcze+1eKnsPcWcF+pp/yjzRqbDq6SnkbLE6zhqOwjaCNoPEtzYJiHjMEc2bm54uW67EEg2PFcLSC3HkR9Sp+Z3fcquGbu0b+X6cfRRqW03tfZZsnUUVhOLxVO+Buh8bnMe02uLEi/vabaCpVXE01dHMzhKEs2Ssyq5Ytu+Lou7Qq6WKz5Vtu6Pmd2hQJYuexvXy8OSNTDS/CRWsqW2jZ0v2KrjZLK05XN9Wzp/4lVQhfaPsHqTuy27nUl66LoydwrcC0zubfX4ujJ3CtzLXwatT8TPxPt+AREVorhV/Lc/wp6bO1WBQGWQvTHpM7VBiuonufImw3XR3o181yxYmfVP5v3C+yLLBiB9U/m/cLmUvWW86Ca9Vlcss9EPWR9NneC+LLLQj1kfTZ3gtBa0Zz1HQaIi3TKCIiAIiIAiIgCIiAIiIAoHLj6jUcze+1TygcuPqNRzN77V4qew9xZwX6mn/KPNGnVuPIn6lT8zu+5acW48ifqVPzO77lVw3tHRZe/Tx/kuTNYy18lPVySxOzS2V/MRnm4cNoK2hk5j8VZHdvovbbPYdYPGONp2FaqroHyVUjI2kl0kga0ayc9y2Vklk02jbnOs6Vws4jU1uvMb+YFztsmGzs5paiLLMaHoIuft2VvnfZrt231aLmbKVt3R8x7QoQsU1i87ZHDN1NuL8fMouZzWC7iAPesnFSUq0mn92RlUbqCRWcsm+qj6f+JVRsrllBapa1rNGac6526CLe7WqrU0j4+G0j37DzFfKM1axNpJzc4H8fF0ZO4VuVaNyVxNlJVRzSAlozg62sBwIvbba97LdlPOyRrXscHNcAWuGkEHaFsYOSzGijiV61zMiIrhWChMrhenPSaptV7KeraWb0NLrgn3W4/eq+Lko0ZX7rE1BXqR3lGljXgxAWjdzfuFNTMUfVQCRpaDa+1c4mk7s3M9ZrKsQs1F/Mj6bO8FlqqCSPSRccY0j/AI/NYIX5rmu12INuOxurkZJ6UU2dCIo/BsWiq4hLCbg6CDra7a1w2FSC3009KMm1tDCIiAIiIAiIgCIiAIiIAoHLj6jUcze+1TygcuPqNRzN77V4qew9xZwX6mn/ACjzRp1bjyI+pQczu+5aggic9zWMaSSbNaNJJOwLc+TlE+CmiiktnNBzraRckutfba9lVwqec2dBl+cfQxjfTe/gk1zPNgWAR0zpJTYySOc4u9lrnEhrf3O3qX5jmMxxjNc8NH6u9wA0qXqqffGluc5t9ZaQDbivbQoF2RNGSSd9JOsl5JPOV6r0qjjmU7JfH77/AJHPelz5udVtv7+7FYq8oi7RE3NHtO0n8hqH6qNMrnm7iSeM6VexkXRjY/4lkGSFINjviWc8nVtnH/CdYmktV+BRo16mtBFiLjiKuIyUpeJ/xL7GTNMPa+JQvJdd93H/AA99Lp7eBr2ryfjfpjOYeLW3q2LPk5i1RhjsydpdTOOkt9IMJ/rbxe8HXs067+MnqcbHfEvsYFBxHrUtHCY2k004ve3/AEeJ16MlZ3PdBOyRrXscHNcAWuGkEHUQsy8OHYbHTgtiBDSb5uwHaQNl/cvY8aDpt7+JbcG2lnKz+9xRdr6CMxnFGwtPpAHaTqHzPuVDrcaaSd7Gcfad221lW+pyQppXZ0jpXO4y8nq0aF8DIqjGx/xrNr4WvWldtbNOr4FulVp0128ChmVzzdxv/wB4lmjV6GR9INjviX0Mk6UbH/Eqssm1n3cf8Jel09vApsa89Tg0Uum2Y7jb+41FX4ZMUw9r4l9jJ2nHtfEo/wD5eJTvFpeP+H3pVN95rbDRWYdLvsQ3xmp7Rez28Tm6weIi9usHaODYtFVxCWE3B0EHW121rhsKxDAYBsPWvqkweGJ5kjBDiLO08IbM4bbbDrC0cJTxVN5tRJrY/lb+itWnSmrq99xJoiLRKwREQBERAEREAREQBQeWMLn0czGNLnOzQGgXJJe3QFOIvkldNElKp6OpGa7Gnwdyr5I5MNpG58lnTOGk6wy/9Lf3O3mUJldlm4O3qkfYA+nKLG5H9LLgi3Gduz32jKKgqKiPe4ZGxA8Mm5cRbggjUOPj7an5t5uUN6nKvUUorMprQa+DqYepUeIxdROXdZ/GytbuXiyB8rsQ5QfhZ8k8rsQ5QfhZ8lPebeblDOpyebeblDOpygzK23iavScme55PpIHyuxDlB+FnyTyuxDlB+FnyU95t5uUM6nJ5t5uUM6nJmVtvEdJyZ7nk+kgfK7EOUH4WfJPK7EOUH4WfJT3m3m5Qzqcnm3m5QzqcmZW28R0nJnueT6SB8rsQ5QfhZ8k8rsQ5QfhZ8lPebeblDOpyebeblDOpyZlbbxHScme55PpIHyuxDlB+FnyTyuxDlB+FnyU95t5uUM6nJ5t5uUM6nJmVtvEdJyZ7nk+kgfK7EOUH4WfJPK7EOUH4WfJT3m3m5Qzqcnm3m5QzqcmZW28R0nJnueT6SB8rsQ5QfhZ8k8rsQ5QfhZ8lPebeblDOpyebeblDOpyZlbbxHScme55PpIHyuxDlB+FnyTyuxDlB+FnyU95t5uUM6nJ5t5uUM6nJmVtvEdJyZ7nk+kgfK7EOUH4WfJPK7EOUH4WfJT3m3m5Qzqcnm3m5QzqcmZW28R0nJnueT6SJw/LOsjka6R5kaOE1wAuNtiBcFbQwzEI6mMSxOu09YO1rhsIVF83E3KG9TlJ5P5LVVG/ObOwtNs5hDrEdehw2FTUvSxdmtBnZQWArQzqUoxku5NJ7NVk+58e9XRERWjACIiAIiIAiL8KA/UXGlRlBWh7gKuo1n/3ScfSXTm5PO+TCaN8jnPcWvu5xLifWP1k6SgLei0b4Q2IzwTUQhmkjvHLfMe5l7Oba+adKitwXFambEntmnlkb4vIc18j3C+fHpsTr0oDodFpTwicRngdh+8zSR5wqM7Me5l7bza+adOs9arW4ji9TLikbZaiZ7d7lOa+R7hcN0GxNkB0gip26Zlm3CaXfGtD5pCWQsOrOtcvdtLW6NA1kgaL3HOddjuK4tLmOlnqHvvaFmcW21nNiZoAHNzoDr1FyBUYBi+HetdBVU40XlaHtA4rvboH5lbf3E8q8VrC+Oqa6anaNFU6zS1w1R51vW36xfSdICA3Ai5oy0osdNfWGCLETEZ5TGY21OYW5xtmZotm8VtCqVfiOK0797qJqyJ9gcyR87HWOo5riDZAdiIuP8MqcYqs4Uz66bNtnb06okzb3tnZt7XsepbD3IKTGG4lGa2OubFmS3M7agMzs30bl4tdAb9RaU3Vd1iWCV9Fhzg1zDmzT2DiHDhRxg3AI1Fx23Ata61XRYXiuLOc6NtRVFvCe5znBpOwvebA+66A6/Rcgtr8Wwibe98qKWRvpb2S4NIN7HMPoPbr2EaFvjcp3RhirXQ1AayqjGcc3gys0DPaNhBIBHvBGuwA2Mi0Z4QuJVEE9GIZpIwY5Lhj3MvZwtfNOlaywiqxeseY6WarleGlxayWUnNBAJ4Wq5HWgOwEXJmIwY/Rt32c18TB/7C+cNBJAF3A2FyRrUlknutYlRyM3+V1TDoD2SnOdbaWSH0g7nJHuQHUKLQ+7HRVLGxYrQVM4pp2sL2skkAY54uyQAGzWuFgeJ3SVQ3Pd0GooKxj6maWWnf6EzXue+zTqe0EnS06dGsXG1AdToonG8dgpKWSskcDExmeCCDn34AYdRLiQBzhcvy5QYpidad6nm3yoksyNkj2tbnGzWgA2DWjbxAk7UB1sihslcG8SpYoDI6VzR6yR5c4vkPCd6RJAvqGwAKZQBERAF+Ffq/CgOI6rhv6Tu1bmyG3XqGgoKellgqHPia4OLBHmm73O0XeDqdxLTNVw39J3atr5HbjbMQooKs1jozKHHMEQdaznN154vweJAQW6zlvT4xJTvp45WCJr2u3wMFy4gi2a48SkPB4+1H/28vfiUNunZCNwZ8DGzmbfWvdcsDLZpAtwjfWpnwePtR/9vL34kBP+ExwsO5qnthVW3BPteP8ACm7qtPhMcLDuap7YVVtwT7Xj/Cm7qAt/hKUMhbQzgExtM0bjsa9+Y5vWGO+FapyPyoqMLqBUU4aXZpY5rxdrmOIJBtYjS0G4Oxda4xRwTQyR1LWOhLTvgktm5o03JOq1r32WutT4ruG0k4EuH1bo2vAc0OAmYWkXGY8EHN1aTnIDHh27zA8FlZQuDSLOMb2yAg6Ddjw3R7rlbEyKymw2tiDMOewNjAG8Bu9ujH4dho06xcX2rnzLDcwxDDInTy73JC0gOkjcTm5xDW5zXAEXJA0XGlVzJjGZKGqgqYyQY3tJt/Uy/psPGC24/NAdmrmfwgPtU/gRf5Lphcz+EB9qn8CL/JAWDwaf5lf0YO2RbmyirzTUlTONcUMsg52MLh2LTPg0/wAyv6MHbItw5WUTqihrIWcKSCZjek6Nwb+pCA43leXEucSSSSSTcknSSTtK6w3KsOZT4VRNYLZ8bZnHjdL6ZJ49YHMAuS113uZ1TZcKoHNNwII2HpRje3DraUBSPCNw9jqOmqM302Tb3f8A+JGOcQePTG3rK1BudYk6lxOikabeuZG73slO9v8A0cVuXwjKoNoKeK4zn1AcBtLWRvziOYub1rSeQtG6fEaKNouTPET0WuDnn8mtJ/JAbI8JT6xRfhyd4KpbkWU1Nhla+eqLgwwvjGa3OOc58ZGjis0q2+Ep9Yovw5O8FSdzLJOPFqt1PLI+NoifLnMAJu1zG207PTPUgNnZabsOHTUdRBTsllfNG+IZ7Axjc8Fpc4k3NgbgAaSBq1rRFNTvle2ONpe9xDWtaLlzjoAAGsqx7ouSf0VWOpw4vYWMkje6wLmu0G9tFw5rh+QV/wDBzqaYy1EL4meMAb7FKRd+96GSMDv6QCWnRrzjxIDbGC5PNbhkNBVNDwKdkMo2E5gDrH3HUfcCuYMusmJcLq5KeS5bwon+3ESc13PosfeCuwVq7wgMNikw4Tub6yGRgY7aBIc17eY6DzgIDRmIZW1c9HT0L33hgc5zRpub8EOO0Mu4N4g73C25dwjIneIvpCob62ZtoAf6ITb0+d/dt7RWkcl6dktbSRyDOY+eBjmna10jQ4HnBK7Ka0AAAWA0ADYBxID7REQBERAF+FfqIDiKq4b+k7tXVe4/9j0PQf8A7r1YfoKj5NB/pR/JeuCBkbQ2NrWtGprQABt0AaAgNE+Er/Pofw5e81RHg8faj/7eXvxLoiqw6CYgyxRyEaAXsa6w91xoXzTYZTxOzooYmOtbOaxrTY6xcDVoQGmPCY4WHc1T2wqrbgn2vH+FN3V0nV0EM1t9ijkte2e1rrX12uNGodS+KfC6eN2dHBEx3tNYxp069ICA1hu6YLitTGx1K50tK0DfaeMelnA3EhA0yt1aP6SL22jUmTOXuJ4aN6gmIjBPqZGh7Qb6bA6WaeIjSut1F4lk/RVJvUUsEp45ImPPWRdAcx5VbpOJYjEYZ5GNiJBdHGwNDi0gtzibk2IBte36KV3KNz6orqiKpmjcyljc2QucLb6WkOaxgPCBIFzqtfTdb/pckMMicHx0NM1w1OEMdxzG2hTiALmfwgPtU/gRf5LpheKowunldnSQRPdqznMY42GoXIQGlPBp/mV/Rg7ZFvheSlw+CG5iijjva+Yxrb21XsNK9aA5z3WdzSemnlq6OMyU0hL3NYCXQuOl92jTvd9II1ajawJrOR+6NiGFsdFTuY6MnO3uVpcGuOstsQRfivZdZKGr8l8PndnzUdPI463OijLjzki5QHLGU2U1bi87XzkvfwIomNOa0HYxguSSduknRxC24dxfc6loia6tZmzFpbDEeFG13Ce/ieRotsBN9JsNm4ZgVJS38WpoYb6zHGxhPOWjSpJAaC8JT6xRfhyd4KK8Hb7Tk/tpP9yJdD1WHQTEGWKOQjQC9jXWHELjQvmlwynidnRQxMda2cxjWmx1i4GrQEBrHwh8B32jirGj0qd+a/8AClIb+jwz4itJ5HY47D6yCqbc728Z4H9UZ9GRvOWk299l2FPC17S17Q5p1tcAQecHWvH9BUfJYP8ASj+SA9dPM2RrXsIc1wDmuGotcLgj3EFUDd6+yJPxIe8tgQxNY0NYA1oAAaAAABqAA1BfNVTRytzZGNe3XmuaHC41GxQHHmRv2hQ/3NP/ALrV1ziuIGBocIy/Q82BAN2Mc+wvo0hhGkjTZGYJSNILaeEEEEERsBBGkEG2gr2yRh2sA84vrFj+hKA8WF4kypEhYDmscGBxt6XoMeSBrABfm6bG7TssTIrHHG1t80AX0mwtpWRAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH/2Q=="
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtW6SpaZS0bshgkQGZzWqMl74d49GQHRyVA&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>

                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBscn6r8ak0TMQXDsQEsZORWUIH38KLBCvQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgGypdDPvD7xhMTxN0CJ-DuWKenqmsIq_qUQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKybPpvW7lDzJ4wFJPtviNCGzAZvbjfw8Og&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZB87nS79Zq1Z2mO0njRsxJrfG8AcfKa4jw&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ps1BT20ihgVk-kRRUETqbLkz9Aw5X7oIfQ&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIg83m09aAOj3g5EtyIp74gD1bDciaWUg3_A&usqp=CAU"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>

                      <li>
                        <Link to="#" className="channel-item">
                          <button className="btn channel-add-wishlist-btn">
                            <AddCircleOutline
                              color={"#fff"}
                              cssClasses="addWishList"
                              title={"Add to Wishlist"}
                              height="28px"
                              width="28px"
                            />
                          </button>

                          <button className="btn channel-play-btn">
                            <Play
                              color={"#fff"}
                              cssClasses="playIcon"
                              title={"Play"}
                              height="28px"
                              width="28px"
                            />
                          </button>
                          <span className="channel-item-thumbnail-block">
                            <img
                              src="https://static.wikia.nocookie.net/logopedia/images/1/19/Colorstv-logo-black-background.jpg"
                              alt=""
                              className="channel-item-thumbnail"
                            />
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Each Category Ends */}
              </div>
            </div>
            {/* Channels Grid ends */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TV;
