import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";

// custom imports
import "./genre.scss";
import { url, headers } from "../../components/API";
import { PosterWide, PosterPotrait } from "../../components/Poster";
import { bannersSettings, listSettings } from "../Home";

const Genre = (props) => {
  const [genreList, setGenreList] = useState([]);

  const history = useHistory();
  const location = useLocation();
  const locUrl = location.pathname;
  const genreId = locUrl.split("/")[2].replaceAll("-", " ");

  const getGenreList = () => {
    axios
      .get(url + "/search?genre=" + genreId)
      .then((res) => {
        console.log("Genres res - ", res.data);
        setGenreList(res.data.results);
      })
      .catch((err) => {
        console.log("Movie Banners err - ", err);
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
    getGenreList();
  }, []);

  return (
    <div className="full-width">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pt-3">
            <div className="full-width genre-title-block">
              <span className="genere-text">Genre: </span>
              <span className="genre-title">
                {genreId.replaceAll("%20", " ")}
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="full-width genre-page pt-4">
              {/* Playlist starts */}
              <div className="full-width genreList">
                {genreList
                  ? genreList.map((movie, index) => {
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
                          wide={true}
                          id={movie._id}
                          image={movie.detailImage ? movie.detailImage : null}
                          title={movie.title ? movie.title : null}
                          genre={movie.genre ? movie.genre : null}
                          metaData={metaData}
                          desc={movie.description ? movie.description : null}
                          type={movie.type}
                          key={index + "gnl"}
                          onClick={() => detailPage(movie._id, movie.type)}
                        />
                      );
                    })
                  : null}
              </div>
              {/* Playlist ends */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
