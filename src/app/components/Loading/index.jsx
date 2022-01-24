import React, { useEffect } from "react";
import "./loading.scss";

export const LoadingShort = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const LoadingStack = (props) => {
  return (
    <div className="full-width loading-stack">
      {props.banner ? <div className="loading-banner full-width"></div> : null}
      <div
        className={
          props.wide
            ? "loading-posters-list full-width"
            : "loading-posters-list full-width poster-height"
        }
      >
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
        <div className="loading-poster"></div>
      </div>
    </div>
  );
};
