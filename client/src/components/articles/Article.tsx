import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { appContext } from "../../App";
import MainStory from "../MainStory/MainStory";
import "./articles.css";

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  urlToImage: string;
  url: string;
  source: {
    id: string;
    name: string;
  };
}

const Articles = ({ category }: { category: string }) => {
  const [articles, setArticles] = useState([]);
  const { setIsLoading, countery } = useContext(appContext);

  const getArticles = async () => {
    // @ts-ignore
    setIsLoading(() => true);
    const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        apiKey: process.env.REACT_APP_ARTICLES_API_KEY,
        country: countery,
        category: category,
      },
    });

    setArticles(() => data.articles);
    // @ts-ignore
    setIsLoading(() => false);
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line
  }, [category, countery]);

  const renderArticles = () => {
    return articles.slice(1).map((article: Article, idx) => {
      return (
        <div key={article.source.id + idx} className="article-card">
          <div className="article-description">
            <h2>{article.title}</h2>
            <div className="article-author">
              <span>{article.author}</span>
              <span>{article.publishedAt}</span>
            </div>
            <p>{article.description}</p>
          </div>
          <div className="article-img">
            <img src={article.urlToImage} alt={article.title} />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <MainStory mainArticle={articles[0]} />
      <div className="articles-container">{renderArticles()}</div>
    </>
  );
};

export default Articles;
