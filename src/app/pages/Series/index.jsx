import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";

// custom imports
import "../Home/home.scss";
import { url, headers } from "../../components/API";
import { PosterPotrait } from "../../components/Poster";
import { bannersSettings, listSettings } from "../Home";
import { LoadingStack } from "../../components/Loading";

const Series = () => {
  const [promos, setPromos] = useState([]);
  const [promoMoreInfo, setPromoMoreInfo] = useState([]);
  const [seriesPlayList, setSeriesPlayList] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getBanners = () => {
    let bannersInfo = [];

    axios
      .get(url + "/promos?filter=series", headers)
      .then((res) => {
        const promoBanners = res.data;
        promoBanners.promos.map((itm) => {
          axios
            .get(url + "/series/" + itm.series, headers)
            .then((tempRes) => {
              bannersInfo.push({
                bannerImage: itm.bannerImage,
                ...tempRes.data,
              });
            })
            .catch((err) => {
              bannersInfo.push({
                bannerImage: itm.bannerImage,
                _id: itm.series,
              });
            });
        });
        console.log("Series Banners - ", bannersInfo);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Series Banners err - ", err);
        setLoading(false);
      });

    setTimeout(() => {
      setPromos(bannersInfo);
    }, 500);
  };

  const getPlayList = () => {
    axios
      .get(url + "/search?filter=series", headers)
      .then((moviesRes) => {
        console.log("movies Data res - ", moviesRes.data);
        setSeriesPlayList(
          "playlists" in moviesRes.data ? moviesRes.data.playlists : null
        );
        setMoviesGenres(
          "genres" in moviesRes.data ? moviesRes.data.genres : null
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log("Home Page Data err - ", err);
        setLoading(false);
      });
  };

  const detailPage = (id) => {
    history.push('/series/'+id)
  }

  useEffect(() => {
    getBanners();
    getPlayList();
  }, []);

  return (
    <div className="full-width">

    {loading ? <LoadingStack banner={true} /> :

      <div className="full-width movies-page">
        {/* Banners starts */}
        {promos ? (
          <div className="full-width banners homeBanners">
            <Slider {...bannersSettings}>
              {promos.map((banner, index) => (
                <Link
                  className="banner-item"
                  to={"/series/" + banner._id}
                  key={index + "sbb"}
                >
                  <div className="banner-image full-width">
                    <img src={banner.bannerImage} alt="" />
                  </div>
                  <div className="banner-content">
                    <div className="banner-title full-width">
                      {banner.title ? banner.title : null}
                    </div>
                    <div className="banner-meta-info full-width">
                      {banner.genre.length > 0
                        ? banner.genre.map((genr, ind) => (
                            <span
                              className="each-meta-info"
                              key={"gnIndx" + ind}
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

        {/* Playlist starts */}
        <div className="full-width videosList">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                {/* Play List Start */}
                {seriesPlayList
                  ? Object.keys(seriesPlayList).map((item, index) => (
                      <div
                        className="full-width playlist-row mt-4"
                        key={index + "sRPLP"}
                      >
                        <h2 className="playlist-heading full-width pb-2">
                          <Link
                            to={"/genre/" + item}
                            className="playlist-heading-title"
                          >
                            {item}
                          </Link>
                          <Link
                            to={"/genre/" + item}
                            className="playListMoreBtn"
                          >
                            More
                          </Link>
                        </h2>
                        <div className="playlist-video-list full-width">
                          {seriesPlayList[item].length > 0 ? (
                            <Slider {...listSettings}>
                              {seriesPlayList[item].map((movie, index) => {
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
                                    key={index + "sSPL"}
                                    image={
                                      movie.cardImage ? movie.cardImage : null
                                    }
                                    title={movie.title ? movie.title : null}
                                    genre={movie.genre ? movie.genre : null}
                                    metaData={metaData}
                                    desc={
                                      movie.description
                                        ? movie.description
                                        : null
                                    }
                                    type="series"
                                    onClick={() =>
                                      history.push("/series/" + movie._id)
                                    }
                                  />
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
                {moviesGenres
                  ? Object.keys(moviesGenres).map((item, index) => (
                      <div
                        className="full-width playlist-row mt-4"
                        key={index + "SSIIPLP"}
                      >
                        <h2 className="playlist-heading full-width pb-2">
                          <Link
                            to={"/genre/" + item}
                            className="playlist-heading-title"
                          >
                            {item}
                          </Link>
                          <Link
                            to={"/genre/" + item}
                            className="playListMoreBtn"
                          >
                            More
                          </Link>
                        </h2>
                        <div className="playlist-video-list full-width">
                          {moviesGenres[item].length > 0 ? (
                            <Slider {...listSettings}>
                              {moviesGenres[item].map((movie, index) => {
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
                                    key={index + "SPLIND"}
                                    image={
                                      movie.cardImage ? movie.cardImage : null
                                    }
                                    title={movie.title ? movie.title : null}
                                    genre={movie.genre ? movie.genre : null}
                                    metaData={metaData}
                                    desc={
                                      movie.description
                                        ? movie.description
                                        : null
                                    }
                                    type="series"
                                    onClick={() =>
                                      history.push("/series/" + movie._id)
                                    }
                                  />
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
      </div>
}

    </div>
  );
};

export default Series;
