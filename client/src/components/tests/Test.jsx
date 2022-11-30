import React from "react";
import "./test.css";

const Test = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="container2">
        <div className="sprite2 aclearSkyIcon">clear</div>
        <div className="sprite2 alightRainIcon">lightrain</div>
        <div className="sprite2 afewCloudsIcon">fewCloud</div>
        <div className="sprite2 aovercastCloudsIcon">overcast</div>
        <div className="sprite2 ascatteredCloudsIcon">scattered</div>
        <div className="sprite2 alightSnowIcon">light snow</div>
        <div className="sprite2 abrokenCloudIcon">brokenCloud</div>
      </div>
      <div className=" weatherIcon2"></div>
    </div>
  );
};

export default Test;
