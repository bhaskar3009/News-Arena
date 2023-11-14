import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
const News = ({ country, category, pageSize, setProgress }) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  document.title = `${capitalizeFirstLetter(category)} - News Arena`;

  //// To convert class based to function based create useStates, add const to all functions, replace this.state....->... and this.setState(...)->set(....)
  //function for capitaliize each word in string

  // async updateNews() {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=5f866c71019a47e18baf71ce61f1a9b1&page=${page}&pageSize=${pageSize}`;
  // setloading(true);
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   this.setState({
  //     articles: parseData.articles,
  //     totalResults: parseData.totalResults,
  //     loading: false,
  //   });
  // }

  useEffect(
    () => {
      const fetchData = async () => {
        setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=5f866c71019a47e18baf71ce61f1a9b1&page=1&pageSize=${pageSize}`;
        setloading(true);
        let data = await fetch(url);
        setProgress(30);
        let parseData = await data.json();
        setProgress(60);

        setarticles(parseData.articles);
        settotalResults(parseData.totalResults);
        setloading(false);

        setProgress(100);
      };

      fetchData();
    },
    [country, category, pageSize, setProgress]
  );

  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     country
  //   }&category=${
  //     category
  //   }&apiKey=5f866c71019a47e18baf71ce61f1a9b1&page=${
  //     this.state.page - 1
  //   }&pageSize=${pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseData.articles,
  //     totalResults: parseData.totalResults,
  //     loading: false,
  //   });

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   // });
  //   // this.updateNews();
  // };

  // handleNextClick = async () => {
  //   const nextPage = this.state.page + 1;

  //   if (nextPage > Math.ceil(this.state.totalResults / pageSize)) {
  //     // No more articles available, do nothing or handle as needed
  //     return;
  //   }

  //   let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=5f866c71019a47e18baf71ce61f1a9b1&page=${nextPage}&pageSize=${pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   this.setState({
  //     page: nextPage,
  //     articles: parseData.articles,
  //     totalResults: parseData.totalResults,
  //     loading: false,
  //   });

  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   // });
  //   // this.updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=5f866c71019a47e18baf71ce61f1a9b1&page=${page+1}&pageSize=${pageSize}`;
    setpage(page+1);
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{marginTop: '90px'}}>
        News Arena - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-4">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={!element.author ? "unknown" : element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  default: "in",
  pageSize: 15,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
