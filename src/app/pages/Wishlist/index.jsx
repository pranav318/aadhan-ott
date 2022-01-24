import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// Custom imports
import { url } from "../../components/API";
import { PosterPotrait } from "../../components/Poster";
import { LoadingStack } from "../../components/Loading";
import NoData from "../../components/NoData";

const Wishlist = (props) => {
  const [searchText, setSearchText] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

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

  const removeWishList = () => {
    alert("Remove Wishlist");
  };

  useEffect(
    (prevProp) => {
      if (prevProp !== props) {
        axios
          .get(url + "/search?q=k")
          .then((srchResp) => {
            setLoading(false);
            setSearchData(srchResp.data.results);
            console.log(srchResp.data.results);
          })
          .catch((err) => {
            setLoading(false);
          });
      }

      return () => {
        setSearchData([]);
      };
    },
    [props]
  );

  return (
    <div className="full-width">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pt-3">
            {loading ? <LoadingStack wide={true} /> : null}

            <div className="full-width genre-title-block">
              <span className="genere-text">My Wishlist </span>
            </div>
          </div>
          <div className="col-12">
            <div className="full-width genre-page pt-4">
              {/* Playlist starts */}
              <div
                className={
                  searchData.length > 0 ? "full-width genreList" : "full-width"
                }
              >
                {searchData.length > 0 ? (
                  searchData.map((movie, index) => {
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
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index / 10 }}
                      >
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
                          removeWishList={() => removeWishList()}
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <NoData />
                )}
              </div>
              {/* Playlist ends */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
