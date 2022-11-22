import axios from "axios";
import React, { useEffect, useState } from "react";
import "./articles.css";

const Articles = ({ category }: { category: string }) => {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        apiKey: process.env.REACT_APP_ARTICLES_API_KEY,
        country: "us",
        category: category,
      },
    });

    setArticles(() => data.articles);
  };

  useEffect(() => {
    getArticles();
    console.log(articles);
  }, [category]);

  interface Article {
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
  const renderArticles = () => {
    console.log(articles);

    return articles.map((article: Article, idx) => {
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

  return <div className="articles-container">{renderArticles()}</div>;
};

export default Articles;
