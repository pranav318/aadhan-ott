import React, { useState, useEffect } from "react";
import axios from "axios";

import Slider from "react-slick";
import { Link, useHistory, NavLink } from "react-router-dom";

// custom imports
import "./home.scss";
import { Rupee } from "../../components/Misc";
import { url, headers } from "../../components/API";
import { PosterPotrait } from "../../components/Poster";
import { LoadingStack } from "../../components/Loading";

//images
import movies from '../../../assets/images/4.jpg'
import series from "../../../assets/images/2.jpg";
import music from "../../../assets/images/1.jpg";

export const bannersSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  //autoplay: true,
  autoplay: false,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
      },
    },
  ],
};
export const listSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  swipeToSlide: true,
  /* variableWidth: true, */
  responsive: [
    {
      breakpoint: 3200,
      settings: {
        slidesToShow: 20,
      },
    },
    {
      breakpoint: 2200,
      settings: {
        slidesToShow: 15,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 11,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 990,
      settings: "unslick",
    },
  ],
};

export const potratPosterSlick = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  swipeToSlide: true,
  /* variableWidth: true, */
  responsive: [
    {
      breakpoint: 3200,
      settings: {
        slidesToShow: 18,
      },
    },
    {
      breakpoint: 2200,
      settings: {
        slidesToShow: 13,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 9,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 990,
      settings: "unslick",
    },
  ],
};

const Home = (props) => {
  const [promos, setPromos] = useState([]);
  const [homePlayList, setHomePlayList] = useState([]);
  const [homeGenres, setHomeGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribe, setSubscribe] = useState([]);

  const history = useHistory();

  const getBanners = () => {
    let bannersInfo = [];

    axios
      .get(url + "/promos?filter=home", headers)
      .then((res) => {
        const promoBanners = res.data;
        // console.log("Banners initial res - ", res.data.promos);
        promoBanners.promos.map((itm, ind) => {
          if (itm.promoType === "movie") {
            axios
              .get(url + "/movies/" + itm.movie, headers)
              .then((tempRes) => {
                bannersInfo.push({
                  bannerImage: itm.bannerImage,
                  promoType: "movie",
                  ...tempRes.data,
                });
              })
              .catch((err) => {
                bannersInfo.push({
                  bannerImage: itm.bannerImage,
                  promoType: "movie",
                  _id: itm.movie,
                });
              });
          } else if (itm.promoType === "series") {
            axios
              .get(url + "/series/" + itm.series, headers)
              .then((tempRes) => {
                bannersInfo.push({
                  bannerImage: itm.bannerImage,
                  promoType: "series",
                  ...tempRes.data,
                });
              })
              .catch((err) => {
                bannersInfo.push({
                  bannerImage: itm.bannerImage,
                  promoType: "series",
                  _id: itm.movie,
                });
              });
          } else if (itm.promoType === "album") {
            axios
              .get(url + "/albums/" + itm.album, headers)
              .then((tempRes) => {
                bannersInfo.push({
                  bannerImage: itm.bannerImage,
                  promoType: "album",
                  ...tempRes.data,
                });
              })
              .catch((err) => {
                bannersInfo.push({
                  bannerImage: itm.bannerImage,
                  promoType: "album",
                  _id: itm.movie,
                });
              });
          }
        });
        // console.log("HomePage Banners - ", bannersInfo);
        setLoading(false);
      })
      .catch((err) => {
        // console.log("HomePage Banners err - ", err);
        setLoading(false);
      });

    setTimeout(() => {
      setPromos(bannersInfo);
    }, 700);
  };

  const getPlayList = () => {
    axios
      .get(url + "/search?filter=home", headers)
      .then((homeRes) => {
        // console.log("Home Data res - ", homeRes.data);
        setHomePlayList(
          "playlists" in homeRes.data ? homeRes.data.playlists : null
        );
        setHomeGenres("genres" in homeRes.data ? homeRes.data.genres : null);
        // console.log("Home playlsit - ", homePlayList);
        // console.log("Home genrelsit - ", homeGenres);
      })
      .catch((err) => {
        // console.log("Home Page Data err - ", err);
      });
  };

  const getSubscribePlans = () => {
    axios.get(url + "/plans").then((res) => {
      console.log("Plans - ", res.data.plans);
      setSubscribe(res.data.plans);
    }).catch(err => {
      setSubscribe([]);
    });
  };

  const detailPage = (id, type) => {
    switch (type) {
      case "movie":
        history.push("/movies/" + id);
        break;
      case "series":
        history.push("/series/" + id);
        break;
      case "album":
        history.push("/album/" + id);
      default:
        history.push("/");
        break;
    }
  };

  useEffect(() => {
    window.scroll(0, 0, "smooth");

    getBanners();
    getPlayList();

    // subscribe
    getSubscribePlans();
  }, [props]);

  return (
    <div className="full-width">
      {loading ? (
        <LoadingStack banner={true} />
      ) : (
        <>
          {/* Banners starts */}
          {promos.length ? (
            <div className="full-width banners homeBanners">
              <Slider {...bannersSettings}>
                {promos.map((banner, index) => (
                  <Link
                    className="banner-item"
                    to={
                      banner.promoType === "series"
                        ? "/series/" + banner._id
                        : banner.promoType === "movie"
                        ? "/movies/" + banner._id
                        : banner.promoType === "album"
                        ? "/album" + banner._id
                        : null
                    }
                    key={banner._id + "homebnrs"}
                  >
                    <div className="banner-image full-width">
                      <img src={banner.bannerImage} alt="" />
                    </div>
                    <div className="banner-content">
                      <div className="banner-title full-width">
                        {banner.title ? banner.title : null}
                      </div>
                      <div className="banner-meta-info full-width">
                        {banner.genre
                          ? banner.genre.map((genr, ind) => (
                              <span
                                className="each-meta-info"
                                key={ind + "banrGenr"}
                              >
                                {genr}
                              </span>
                            ))
                          : null}
                        {banner.language ? (
                          <span className="each-meta-info">
                            {banner.language}
                          </span>
                        ) : null}

                        {banner.language ? (
                          <span className="each-meta-info">
                            {banner.language}
                          </span>
                        ) : null}
                      </div>

                      {banner.description ? (
                        <div className="banner-meta-desc full-width">
                          {banner.description}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          ) : null}
          {/* Banners Ends */}

          {/* Categories Starts */}

          <div className="full-width categoriesList d-none d-lg-block">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                  <Link
                    to="/movies"
                    className="each-category-block full-width"
                    style={{ backgroundImage: `url(${series})` }}
                  >
                    <span>Movies</span>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <Link
                    to="/series"
                    className="each-category-block full-width"
                    style={{ backgroundImage: `url(${music})` }}
                  >
                    <span>Series</span>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <Link
                    to="/tv"
                    className="each-category-block full-width"
                    style={{ backgroundImage: `url(${movies})` }}
                  >
                    <span>Live TV</span>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div

                    className="each-category-block homeTryBlock full-width"
                  >
                    {subscribe.length > 0 ? (
                      <NavLink
                        exact={true}
                        to="/subscribe"
                        className="homeTryBlockLink"
                        activeClassName="activeLink"
                      >
                        <span className="try-subscribe-tex">
                          Try Subscription from
                        </span>
                        <span className="try-subscribe-price">
                          <span className="try-rupee">
                            <Rupee />
                          </span>{" "}
                          <span className="try-rupee-text">
                            {subscribe[0].price}
                          </span>
                        </span>
                      </NavLink>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Ends */}

          {/* Playlist starts */}
          <div className="full-width videosList">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {/* Play List Start */}
                  {homePlayList
                    ? Object.keys(homePlayList).map((item, index) => (
                        <div
                          className="full-width playlist-row mt-2 mt-md-4"
                          key={index + "hPLP"}
                        >
                          <h2 className="playlist-heading full-width">
                            {item}
                          </h2>
                          <div className="playlist-video-list full-width">
                            {homePlayList[item].length > 0 ? (
                              <Slider {...listSettings}>
                                {homePlayList[item].map((movie, index) => {
                                  let metaData = [];
                                  if (movie.year) {
                                    metaData.push(movie.year);
                                  }
                                  if (movie.maturity) {
                                    metaData.push(movie.maturity);
                                  }
                                  if (movie.language) {
                                    metaData.push(movie.language);
                                  }
                                  return (
                                    <div className="" key={index + "hPlayList"}>
                                      <PosterPotrait
                                        id={movie._id}
                                        image={
                                          movie.cardImage
                                            ? movie.cardImage
                                            : null
                                        }
                                        title={movie.title ? movie.title : null}
                                        genre={movie.genre ? movie.genre : null}
                                        metaData={metaData}
                                        desc={
                                          movie.description
                                            ? movie.description
                                            : null
                                        }
                                        type={movie.type}
                                        onClick={() =>
                                          detailPage(movie._id, movie.type)
                                        }
                                        model={movie.model ? movie.model : null}
                                      />
                                    </div>
                                  );
                                })}
                              </Slider>
                            ) : null}
                          </div>
                        </div>
                      ))
                    : ""}
                  {/* Play List Ends */}
                  {/* Genres List Starts */}
                  {homeGenres
                    ? Object.keys(homeGenres).map((item, index) => (
                        <div
                          className="full-width playlist-row mt-4"
                          key={index + "hPLP"}
                        >
                          <h2 className="playlist-heading full-width pb-2">
                            {item}
                          </h2>
                          <div className="playlist-video-list full-width">
                            {homeGenres[item].length > 0 ? (
                              <Slider {...listSettings}>
                                {homeGenres[item].map((movie, index) => {
                                  let metaData = [];
                                  if (movie.year) {
                                    metaData.push(movie.year);
                                  }
                                  if (movie.maturity) {
                                    metaData.push(movie.maturity);
                                  }
                                  if (movie.language) {
                                    metaData.push(movie.language);
                                  }
                                  return (
                                    <div className="" key={index + "hPlayList"}>
                                      <PosterPotrait
                                        id={movie._id}
                                        image={
                                          movie.cardImage
                                            ? movie.cardImage
                                            : null
                                        }
                                        title={movie.title ? movie.title : null}
                                        genre={movie.genre ? movie.genre : null}
                                        metaData={metaData}
                                        desc={
                                          movie.description
                                            ? movie.description
                                            : null
                                        }
                                        type={movie.type}
                                        onClick={() =>
                                          detailPage(movie._id, movie.type)
                                        }
                                        model={movie.model ? movie.model : null}
                                      />
                                    </div>
                                  );
                                })}
                              </Slider>
                            ) : null}
                          </div>
                        </div>
                      ))
                    : ""}
                  {/* Genres List Ends */}
                </div>
              </div>
            </div>
          </div>
          {/* Playlist ends */}
        </>
      )}
    </div>
  );
};

export default Home;
