import React from "react";
import { Link } from "react-router-dom";
const NewsItem = (props) => {
    let {title, description, imgUrl, newsUrl, author, date} = props;
    return (
      <div className="my-3">
        
        <div className="card" style={{width: "18rem"}}>
          <img src={!imgUrl?"https://cdn.pixabay.com/photo/2015/09/16/17/09/newspaper-943004_1280.jpg":imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <Link to={newsUrl} target="_blank" className="btn btn-secondary">
              Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }
export default NewsItem