import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";

// custom imports
import "../Home/home.scss";
import { url, headers } from "../../components/API";
import { PosterPotrait } from "../../components/Poster";
import { bannersSettings, listSettings } from "../Home";
import {LoadingStack} from '../../components/Loading';


const Movies = () => {
  const [promos, setPromos] = useState([]);
  const [moviesPlayList, setMoviesPlayList] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const getBanners = () => {
    let bannersInfo = [];
    axios
      .get(url + "/promos?filter=movies", headers)
      .then((res) => {
        console.log("Banner res - ", res.data);
        const promoBanners = res.data;
        promoBanners.promos.map((itm) => {
          axios
            .get(url + "/movies/" + itm.movie, headers)
            .then((tempRes) => {
              bannersInfo.push({
                bannerImage: itm.bannerImage,
                ...tempRes.data,
              });
            })
            .catch((err) => {
              bannersInfo.push({
                bannerImage: itm.bannerImage,
                _id: itm.movie,
              });
            });
        });
        console.log("Movies Banners - ", bannersInfo);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Movies Banners err - ", err);
        setLoading(false);
      });

    setTimeout(() => {
      setPromos(bannersInfo);
    }, 500);
  };

  const getPlayList = () => {
    axios
      .get(url + "/search?filter=movies", headers)
      .then((moviesRes) => {
        console.log("movies Data res - ", moviesRes.data);
        setMoviesPlayList(
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

  useEffect(() => {
    getBanners();
    getPlayList();
  }, []);

  return (
    <div className="full-width">
      {loading ? <LoadingStack banner={true} /> :

      <div className="full-width movies-page">
        {/* Banners starts */}
        {promos.length > 0 ? (
          <div className="full-width banners homeBanners">
            <Slider {...bannersSettings}>
              {promos.map((banner, ind) => (
                <Link
                  className="banner-item"
                  to={"/movies/" + banner._id}
                  key={ind + "moVBan"}
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
                            <span className="each-meta-info" key={ind + "bGn"}>
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

          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Play List Start */}
                {moviesPlayList
                  ? Object.keys(moviesPlayList).map((item, index) => (
                      <div
                        className="full-width playlist-row mt-4"
                        key={index + "moPlIt"}
                      >
                        <h2 className="playlist-heading full-width pb-2">
                          <span
                            className="playlist-heading-title"
                          >
                            {item}
                          </span>
                          {/* <Link
                            to={"/genre/" + item.toLowerCase().replaceAll(" ", "-")}
                            className="playListMoreBtn"
                          >
                            More
                          </Link> */}
                        </h2>
                        <div className="playlist-video-list full-width">
                          {moviesPlayList[item].length > 0 ? (
                            <Slider {...listSettings}>
                              {moviesPlayList[item].map((movie, index) => {
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
                                    key={"mPlmPL" + index}
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
                                    type="movie"
                                    onClick={() =>
                                      history.push("/movies/" + movie._id)
                                    }
                                    model={movie.model ? movie.model : null}
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
                        key={index + "mvGnrl"}
                      >
                        <h2 className="playlist-heading full-width pb-2">
                          <Link
                            to={"/genre/" + item.replaceAll(" ", "-")}
                            className="playlist-heading-title"
                          >
                            {item}
                          </Link>
                          <Link
                            to={"/genre/" + item.replaceAll(" ", "-")}
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
                                    key={movie._id + "MGItm"}
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
                                    type="movie"
                                    onClick={() =>
                                      history.push("/movies/" + movie._id)
                                    }
                                    model={movie.model ? movie.model : null}
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

export default Movies;
