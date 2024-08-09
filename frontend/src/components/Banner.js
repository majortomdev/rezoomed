import React from "react";
import "./Banner.css"; // Create this file for styling

const Banner = () => {
  return (
    <div className="banner">
      <img
        src="/path/to/your/logo.png"
        alt="Site Logo"
        className="banner-logo"
      />
      <h1 className="banner-title">ReZoomed</h1>
    </div>
  );
};

export default Banner;
