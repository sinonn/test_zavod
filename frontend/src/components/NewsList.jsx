import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteNews,
  fetchNews,
  handleDislike,
  handleLike,
  handleReadMore,
} from "../service/NewsService";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews(page, setNews, setPage, loading, setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" container d-flex flex-column align-items-center w-100">
      <h1 className="my-4">News List</h1>
      <div className="d-flex gap-3">
        <Link to="/stats" className="btn btn-info mb-3 ms-2">
          View News Statistics
        </Link>
        <Link to="/create" className="btn btn-success mb-3">
          Add News
        </Link>
      </div>
      {news.map((item) => (
        <div key={item._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.text}</p>
            <p className="mb-1">
              <strong>Tags:</strong> {item.tags.join(", ")}
            </p>
            <p className="mb-1">
              <strong>Likes:</strong> {item.likes} | <strong>Views:</strong>{" "}
              {item.views}
            </p>

            <button
              onClick={() => handleLike(item._id, setNews)}
              className="btn btn-outline-primary me-2"
            >
              👍 Like
            </button>
            <button
              onClick={() => handleDislike(item._id, setNews)}
              className="btn btn-outline-secondary me-2"
              disabled={item.likes === 0}
            >
              👎 Dislike
            </button>

            <Link
              to={`/news/${item._id}`}
              onClick={() => handleReadMore(item._id)}
              className="btn btn-primary"
            >
              Read More
            </Link>
            <button
              onClick={() => deleteNews(item._id, setNews)}
              className="btn btn-danger ms-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={() => fetchNews(page, setNews, setPage, loading, setLoading)}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default NewsList;
