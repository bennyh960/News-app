import React from "react";
import "./mainStory.css";
import { Article } from "../articles/Article";

const MainStory = ({ mainArticle }: { mainArticle: Article }) => {
  if (!mainArticle) return <></>;
  return (
    <div className="main-story-container">
      <div className="main_story_image">
        <img src={mainArticle.urlToImage} alt="main article" />
      </div>
      <div className="main_story_short">
        <h1>{mainArticle.title}</h1>
        <p>{mainArticle.description}</p>
        <div className="meta-data-main-artlice">
          <div>
            <b>{mainArticle.author}</b>
          </div>
          <div>{mainArticle.publishedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default MainStory;
