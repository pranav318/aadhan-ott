import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";

import {
  AddCircleOutline,
  Play,
  VolumeHighOutline,
  VolumeMuteOutline,
} from "react-ionicons";
import { LockClosed } from "react-ionicons";

// custom imports
import { url } from "../../components/API";
import { PosterPotrait } from "../../components/Poster";
import { listSettings, potratPosterSlick } from "../Home";
import "../MovieDetail/movieDetail.scss";
import NoData from "../../components/NoData";
import { LoadingStack } from "../../components/Loading";
import { Rupee } from "../../components/Misc";

// Trailer
import Trailer1 from "../../../assets/vdo/trailer-2.mp4";

const SeriesDetail = () => {
  const [seriesDet, setSeriesDet] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [subscribe, setSubscribe] = useState([]);
  const [scroll, setScroll] = useState(null);

  const history = useHistory();


  const updateSchema = (mDet) => {

    return {
      "@context": "https://schema.org",
      "@type": "Movie",
      actor:
        "actors" in mDet
          ? mDet.actors.map((obj, ind) => {
              return { "@type": "Person", name: obj };
            })
          : [],
      director:
        "directors" in mDet
          ? mDet.directors.map((obj, ind) => {
              return { "@type": "Person", name: obj };
            })
          : [],
      producer:
        "producers" in mDet
          ? mDet.producers.map((obj, ind) => {
              return { "@type": "Person", name: obj };
            })
          : [],
      genre:
        "genres" in mDet
          ? mDet.genres.map((obj, ind) => {
              return { "@type": "Text", name: obj };
            })
          : [],
      //"isFamilyFriendly" :true ,
      copyrightYear: mDet.year,
      isAccessibleForFree: mDet.model === "free" ? true : false,
      duration: mDet.duration + "secs",
      description: mDet.description,
      name: mDet.title,
      image: mDet.cardImage,
      thumbnailURL: mDet.detailImage,
      url: window.location.href,
      startDate: mDet.availability === "restricted" ? mDet.startDate : null,
      endDate: mDet.availability === "restricted" ? mDet.endDate : null,
    };
  };

  const getSeriesDetail = (seriesId) => {
    axios
      .get(url + "/series/" + seriesId)
      .then((res) => {
        // set movie details
        setSeriesDet(res.data);

        // update schema.org
        updateSchema(res.data);

        // episodes data

        "episodes" in res.data
          ? setEpisodes(res.data.episodes)
          : setEpisodes([]);

        "similarSeries" in res.data
          ? setSimilar(res.data.similarSeries)
          : setSimilar([]);

        console.log("Episodes - ", episodes);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const detailPage = (id) => {
    history.push("/series/" + id);
    getSeriesDetail(id);
  };

  const trailerVolumeToggle = () => {
    setMuted(!muted);
  };

  const getSubscribePlans = () => {
    axios.get(url + "/plans").then((res) => {
      console.log("Plans - ", res.data.plans);
      setSubscribe(res.data.plans);
    }).catch(err => {
      setSubscribe([]);
    });
  };

  const locUrl = window.location.pathname.split("/")[2];

  useEffect(() => {
    // Auto scroll top
    window.scroll(0, 0, "smooth");


    getSeriesDetail(locUrl);
    getSubscribePlans();

    // on scroll show sticky
    // Sticky Movie Mini Info
    let stcikyHeader;

    setTimeout(() => {
      const stickyDiv = document.getElementById("stickyHeader");
      stcikyHeader = stickyDiv ? stickyDiv.offsetTop : 600;
    }, 1200);
    console.log("Header - ", stcikyHeader);
    const onScrolling = window.addEventListener("scroll", () => {
      if (window.pageYOffset > stcikyHeader) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", onScrolling);
      setLoading(false);
    };
  }, []);

  return (
    <div className="full-width movie-detail-page">
      {loading ? (
        <LoadingStack banner={true} wide={true} />
      ) : (
        <>
          <div className="full-width movie-detail-block">
            <div className="movie-player-basic-info full-width">
              {/* Video Player Block Starts */}
              {seriesDet ? (
                <>
                  {seriesDet.trailer ? (
                    <div className="full-width trailer-video-block">
                      <i className="trailer-video-player-overlay"></i>
                      <div className="trailer-video-player-block full-width">
                        <video
                          className="trailer-video-player"
                          autoPlay
                          controls={false}
                          loop={true}
                          muted={muted}
                        >
                          <source src={seriesDet.trailer} type="video/mp4" />
                        </video>
                      </div>
                      <button
                        type="button"
                        className="volumeToggle btn"
                        onClick={() => trailerVolumeToggle}
                      >
                        {muted ? (
                          <VolumeMuteOutline size="50" color="#b6babd" />
                        ) : (
                          <VolumeHighOutline size="50" color="#b6babd" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="movie-detail-banner full-width">
                      <img
                        src={seriesDet.detailImage}
                        alt=""
                        className="movie-detail-banner-image"
                      />
                    </div>
                  )}
                </>
              ) : null}
              {/* Video Player Block Ends */}

              {/* Movie Basic Info Starts */}
              {seriesDet ? (
                <div className="full-width movie-basic-info">
                  <div className="movie-basic-poster">
                    <div className="movie-basic-poster-thumbnail-block full-width">
                      <img
                        src={seriesDet.cardImage}
                        alt=""
                        className="movie-basic-poster-thumbnail img-fluid"
                      />
                    </div>
                  </div>

                  <div className="movie-basic-info-block">
                    <div className="movie-basic-type-block full-width">
                      {seriesDet.model === "free" ? (
                        <span className="movie-model free">Free</span>
                      ) : seriesDet.model === "subscription" ? (
                        <span className="movie-model premium">Premium</span>
                      ) : null}
                    </div>
                    <div className="movie-title full-width">
                      <h1 className="movie-title-text full-width">
                        {seriesDet.title}
                      </h1>
                    </div>
                    <div className="movie-meta-info full-width">
                      {seriesDet.genre
                        ? seriesDet.genre.map((gen, ind) => (
                            <span
                              className="each-meta-info dot"
                              key={"genk" + ind}
                            >
                              {gen}
                            </span>
                          ))
                        : null}
                      {seriesDet.language ? (
                        <span className="each-meta-info dot">
                          {seriesDet.language}
                        </span>
                      ) : null}
                      {seriesDet.maturity ? (
                        <span className="each-meta-info dot">
                          {seriesDet.maturity}
                        </span>
                      ) : null}
                    </div>
                    <div className="movie-actions-block full-width">
                      <button className="btn watch-try-btn" type="button">
                        <span className="watch-btn">
                          <Play size="30" color="#ffffff" /> Watch
                        </span>
                        {subscribe.length > 0 ? (
                          <span className="try-text-block">
                            <Play
                              color={"#ffffff"}
                              title="Watch Movie"
                              height="24px"
                              width="24px"
                              className="movie-play-btn-icon"
                            />{" "}
                            Try for
                            <span className="try-rupee">
                              <Rupee />
                            </span>{" "}
                            <span className="try-rupee-text">
                              {subscribe[0].price}
                            </span>
                          </span>
                        ) : null}
                      </button>
                      <button className="btn add-fav-btn" type="button">
                        <AddCircleOutline size="30" color={"#ffffff"} /> Add
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* Movie Basic Info Ends */}
            </div>

            {/* Movie Sticky Starts */}
            {seriesDet ? (
              <div
                className={
                  scroll
                    ? "movie-sticky-info-block full-width sticky"
                    : "movie-sticky-info-block full-width"
                }
              >
                <div className="movie-sticky-poster-info">
                  <div className="movie-sticky-thumbnail-block">
                    <img
                      src={seriesDet.detailImage}
                      alt=""
                      className="movie-basic-poster-thumbnail img-fluid"
                    />
                  </div>
                  <div className="movie-sticky-info">
                    <div className="movie-sticky-model-block full-width">
                      {seriesDet.model === "free" ? (
                        <span className="movie-model free">Free</span>
                      ) : seriesDet.model === "subscription" ? (
                        <span className="movie-model premium">Premium</span>
                      ) : null}
                    </div>

                    <div className="movie-sticky-title full-width">
                      <div className="movie-sticky-title-text full-width">
                        {seriesDet.title}
                      </div>
                      <div className="movie-meta-info full-width">
                        {seriesDet.genre
                          ? seriesDet.genre.map((gen, ind) => (
                              <span
                                className="each-meta-info dot"
                                key={"gen" + ind}
                              >
                                {gen}
                              </span>
                            ))
                          : null}
                        {seriesDet.language ? (
                          <span className="each-meta-info dot">
                            {seriesDet.language}
                          </span>
                        ) : null}
                        {seriesDet.maturity ? (
                          <span className="each-meta-info dot">
                            {seriesDet.maturity}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="movie-sticky-actions-block">
                  <div className="watch-try-block">
                    <button className="btn watch-try-btn" type="button">
                      <span className="watch-btn">
                        <Play size="30" color="#ffffff" /> Watch
                      </span>
                      {subscribe.length > 0 ? (
                        <span className="try-text-block">
                          <Play
                            color={"#ffffff"}
                            title="Watch Movie"
                            height="24px"
                            width="24px"
                            className="movie-play-btn-icon"
                          />{" "}
                          Try for <br />
                          <span className="try-rupee">
                            <Rupee />
                          </span>{" "}
                          <span className="try-rupee-text">
                            {subscribe[0].price}
                          </span>
                        </span>
                      ) : null}
                    </button>
                  </div>
                  <div className="add-wishlist-block">
                    <button className="btn add-fav-btn" type="button">
                      <AddCircleOutline size="30" color={"#ffffff"} /> Add
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {/* Movie Sticky Ends */}
          </div>

          {/* Episodes Starts */}
          {episodes.length > 0 ? (
            <div className="full-width py-3 video-list-block bg-dark">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="full-width playlist-row">
                      <h2 className="playlist-heading full-width pb-2">
                        <span className="playlist-heading-title">Episodes</span>
                      </h2>
                      <div className="playlist-video-list full-width">
                        <Slider {...potratPosterSlick}>
                          {episodes.map((movie, index) => {
                            let metaData = [];

                            if (movie.season) {
                              metaData.push("Season " + movie.season);
                            }

                            if (movie.number) {
                              metaData.push("Episode " + movie.number);
                            }

                            return (
                              <div
                                className="landscapeListItem"
                                key={"epis" + index}
                              >
                                <PosterPotrait
                                  key={movie._id + "EPI"}
                                  image={
                                    movie.cardImage ? movie.cardImage : null
                                  }
                                  title={movie.name ? movie.name : null}
                                  metaData={metaData}
                                  type="series"
                                  onClick=""
                                  wide={true}
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Episodes Ends */}

          <div className="full-width movie-desc-block py-3" id="stickyHeader">
            {seriesDet ? (
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-10 offset-md-1">
                    <div className="full-width">{seriesDet.description}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Similar Movies Starts */}
          {similar.length > 0 ? (
            <div className="full-width mt-5">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="full-width playlist-row">
                      <h2 className="playlist-heading full-width pb-2">
                        <span className="playlist-heading-title">
                          Similar Series
                        </span>
                      </h2>
                      <div className="playlist-video-list full-width">
                        <Slider {...listSettings}>
                          {similar.map((movie, index) => {
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
                              <div key={index + "smv"}>
                                <PosterPotrait
                                  id={movie._id}
                                  key={movie._id + "SEItm"}
                                  image={
                                    movie.cardImage ? movie.cardImage : null
                                  }
                                  title={movie.title ? movie.title : null}
                                  genre={movie.genre ? movie.genre : null}
                                  metaData={metaData}
                                  desc={
                                    movie.description ? movie.description : null
                                  }
                                  type="series"
                                  onClick={() => detailPage(movie._id)}
                                />
                              </div>
                            );
                          })}
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Similar Movies Ends */}
        </>
      )}
    </div>
  );
};

export default SeriesDetail;
