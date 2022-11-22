import React, { useState } from "react";
import Articles from "../articles/Article";
import MainStory from "../MainStory/MainStory";
import "./home.css";
const Home = ({ category }: { category: string }) => {
  return (
    <div>
      <MainStory />
      <Articles category={category} />
    </div>
  );
};

export default Home;
