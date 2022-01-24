import React from "react";
import { AddCircleOutline, Play, } from "react-ionicons";

// Custom import
import "./poster.scss";

export const PosterPotrait = (props) => {


  let videoLink = () => {
    switch (props.type) {
      case "movie":
        return "/movies/" + props.id;
      case "series":
        return "/series/" + props.id;
      case "album":
        return "/album/" + props.id;

      default:
        break;
    }
  };



  return (
    <div className={props.wide ? "posterPotrait posterWide" : "posterPotrait"}>
      <div className="posterThumbnail">
        {props.image ? <img src={props.image} alt="" /> : null}
        <button
          type="button"
          className="poasterPlayBtn btn p-0"
          onClick={props.onClick}
        >
          <Play
            color={"#fff"}
            title={"Play"}
            height="44px"
            width="44px"
            cssClasses={"playIcon"}
          />
        </button>
        <button
          type="button"
          className="addWishListBtn btn p-0"
          onClick={() => props.addWishList}
        >
          <AddCircleOutline
            color={"#fff"}
            cssClasses="addWishList"
            title={"Add to Wishlist"}
            height="28px"
            width="28px"
          />
        </button>
      </div>
      <div className="posterInfo">
        <button
          type="button"
          className="posterInfoContent btn"
          onClick={props.onClick}
        >
          <div className="poster-title full-width text-truncate">
            {props.title}
          </div>
          {props.metaData && props.metaData.length > 0 ? (
            <div className="meta-list full-width">
              {props.metaData.map((meta, index) => (
                <span className="each-meta-item" key={index + "metPost"}>{meta}</span>
              ))}
            </div>
          ) : null}
          {props.model ? (
            <div className="movie-model full-width">
              {props.model === "free" ? (
                <span className="movie-model free">Free</span>
              ) : props.model === "subscription" ? (
                <span className="movie-model premium">Premium</span>
              ) : null}
            </div>
          ) : null}
          {/* {props.desc ? (
            <div className="poster-desc full-width">{props.desc}</div>
          ) : null} */}
        </button>
        {/* <button
          type="button"
          className="btn btn-dark addWishListBlock full-width"
          onClick={() => props.addWishList}
        >
          <span>+ Add to WishList</span>
        </button>
        {props.removeWishList ? (
          <button
            type="button"
            className="btn btn-dark addWishListBlock removeWishList full-width"
            onClick={() => props.removeWishList}
          >
            <span>- Remove WishList</span>
          </button>
        ) : null} */}
      </div>
    </div>
  );
};
