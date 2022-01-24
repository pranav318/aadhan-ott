import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import {
  VolumeMuteOutline,
  VolumeHighOutline,
  Play,
  AddCircleOutline,
} from "react-ionicons";

import { LockClosed } from "react-ionicons";

// custom imports
import { url } from "../../components/API";
import { PosterPotrait } from "../../components/Poster";
import { listSettings, potratPosterSlick } from "../Home";
import "./movieDetail.scss";
import NoData from "../../components/NoData";
import { LoadingStack } from "../../components/Loading";
import { Rupee } from "../../components/Misc";

// Video imports
import Trailer1 from "../../../assets/vdo/trailer-1.mp4";

const MovieDetail = () => {
  const [movDet, setMovDet] = useState(null);
  const [simlMov, setSimlMov] = useState([]);
  const [trailer, setTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [subscribe, setSubscribe] = useState([]);
  const [scroll, setScroll] = useState(null);

  const trailerVolume = useRef();

  const history = useHistory();

  const trailerVolumeToggle = () => {
    setMuted(!muted);
  };

  const updateSchema = (mDet) => {
    /*window.wf.logEvent( mDet.title, {
      content_type: 'Movie',
      content_id: mDet._id,
      items: [{ name: mDet.title }]
    });*/
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

  const getMovieDetail = (movId) => {
    axios
      .get(url + "/movies/" + movId)
      .then((res) => {
        // set movie details
        setMovDet(res.data);

        // update schema.org
        updateSchema(res.data);

        // set similar movies data
        res.data.similarMovies.length
          ? setSimlMov(res.data.similarMovies)
          : setSimlMov([]);

        const trailer = "trailer" in res.data;

        setTrailer(trailer);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getSubscribePlans = () => {
    axios.get(url + "/plans").then((res) => {
      console.log("Plans - ", res.data.plans);
      setSubscribe(res.data.plans);
    }).catch(err => {
      setSubscribe([]);
    });
  };

  const detailPage = (id) => {
    history.push("/movies/" + id);
    getMovieDetail(id);
  };

  const playTrailer = (id) => {
    history.push("/movies/" + id);
  };

  useEffect(() => {
    const locUrl = window.location.pathname.split("/")[2];
    getMovieDetail(locUrl);
    getSubscribePlans();

    // Sticky Movie Mini Info
    const stickyDiv = document.getElementById("stickyHeader");
    const stcikyHeader = stickyDiv ? stickyDiv.offsetTop : 600;
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
      {/* New Detail Banner Block */}
      {loading ? (
        <LoadingStack banner="true" wide={true} />
      ) : (
        <div className="full-width movie-detail-block">
          <div className="movie-player-basic-info full-width">
            {/* Video Player Block Starts */}
            <div className="full-width trailer-video-block">
              <i className="trailer-video-player-overlay"></i>
              <div className="trailer-video-player-block full-width">
                <video
                  className="trailer-video-player"
                  autoPlay
                  controls={false}
                  loop={true}
                  ref={trailerVolume}
                  muted={muted}
                >
                  <source src={Trailer1} type="video/mp4" />
                </video>
              </div>
              <button
                type="button"
                className="volumeToggle btn"
                onClick={() => trailerVolumeToggle()}
              >
                {muted ? (
                  <VolumeMuteOutline size="50" color="#b6babd" />
                ) : (
                  <VolumeHighOutline size="50" color="#b6babd" />
                )}
              </button>
            </div>
            {/* Video Player Block Ends */}

            {/* Movie Basic Info Starts */}
            {movDet ? (
              <div className="full-width movie-basic-info">
                <div className="movie-basic-poster">
                  <div className="movie-basic-poster-thumbnail-block full-width">
                    <img
                      src={movDet.cardImage}
                      alt=""
                      className="movie-basic-poster-thumbnail img-fluid"
                    />
                  </div>
                </div>

                <div className="movie-basic-info-block">
                  <div className="movie-basic-type-block full-width">
                    {movDet.model === "free" ? (
                      <span className="movie-model free">Free</span>
                    ) : movDet.model === "subscription" ? (
                      <span className="movie-model premium">Premium</span>
                    ) : null}
                  </div>
                  <div className="movie-title full-width">
                    <h1 className="movie-title-text full-width">
                      {movDet.title}
                    </h1>
                  </div>
                  <div className="movie-meta-info full-width">
                    {movDet.genre
                      ? movDet.genre.map((gen, ind) => {
                          <span
                            className="each-meta-info dot"
                            key={"gen" + ind}
                          >
                            {gen}
                          </span>;
                        })
                      : null}
                    {movDet.language ? (
                      <span className="each-meta-info dot">
                        {movDet.language}
                      </span>
                    ) : null}
                    {movDet.maturity ? (
                      <span className="each-meta-info dot">
                        {movDet.maturity}
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
          {movDet ? (
            <>
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
                      src={movDet.detailImage}
                      alt=""
                      className="movie-basic-poster-thumbnail img-fluid"
                    />
                  </div>
                  <div className="movie-sticky-info">
                    <div className="movie-sticky-model-block full-width">
                      {movDet.model === "free" ? (
                        <span className="movie-model free">Free</span>
                      ) : movDet.model === "subscription" ? (
                        <span className="movie-model premium">Premium</span>
                      ) : null}
                    </div>

                    <div className="movie-sticky-title full-width">
                      <div className="movie-sticky-title-text full-width">
                        {movDet.title}
                      </div>
                      <div className="movie-meta-info full-width">
                        {movDet.genre
                          ? movDet.genre.map((gen, ind) => {
                              <span
                                className="each-meta-info dot"
                                key={"gen" + ind}
                              >
                                {gen}
                              </span>;
                            })
                          : null}
                        {movDet.language ? (
                          <span className="each-meta-info dot">
                            {movDet.language}
                          </span>
                        ) : null}
                        {movDet.maturity ? (
                          <span className="each-meta-info dot">
                            {movDet.maturity}
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
            </>
          ) : null}
          {/* Movie Sticky Ends */}

          {movDet ? (
            <div className="full-width movie-desc-block py-3" id="stickyHeader">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-10 offset-md-1">
                    <div className="full-width">{movDet.description}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
      {/* New Detail Banner Block */}

      {/* Trailers & extras Starts */}
      {trailer ? (
        <div className="trailers-extra full-width bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="full-width playlist-row mt-2">
                  <h2 className="playlist-heading full-width pb-2">
                    <span className="playlist-heading-title">
                      Trailers &amp; Extras
                    </span>
                  </h2>
                  <div className="playlist-video-list full-width">
                    <Slider {...potratPosterSlick}>
                      <PosterPotrait
                        id={movDet._id}
                        key={movDet._id + "TXta"}
                        image={movDet.detailImage ? movDet.detailImage : null}
                        title={
                          movDet.title ? movDet.title + " - trailer" : null
                        }
                        genre={movDet.genre ? movDet.genre : null}
                        metaData=""
                        desc={movDet.description ? movDet.description : null}
                        type="movie"
                        wide={true}
                        onClick={() => playTrailer(movDet._id)}
                      />
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Trailers & extras Ends */}

      {/* Similar Movies Starts */}
      {simlMov.length ? (
        <div className="full-width mt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="full-width playlist-row">
                  <h2 className="playlist-heading full-width pb-2">
                    <span className="playlist-heading-title">
                      Similar Movies
                    </span>
                  </h2>
                  <div className="playlist-video-list full-width">
                    <Slider {...listSettings}>
                      {simlMov.map((movie, index) => {
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
                          <PosterPotrait
                            id={movie._id}
                            key={movie._id + "MGItm"}
                            image={movie.cardImage ? movie.cardImage : null}
                            title={movie.title ? movie.title : null}
                            genre={movie.genre ? movie.genre : null}
                            metaData={metaData}
                            desc={movie.description ? movie.description : null}
                            type="movie"
                            onClick={() => detailPage(movie._id)}
                          />
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
    </div>
  );
};

export default MovieDetail;
