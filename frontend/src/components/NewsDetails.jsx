import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../service/NewsService";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((res) => setNews(res.data));
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title">{news.title}</h1>
          <p className="text-muted">
            Published on {new Date(news.createdAt).toLocaleString()}
          </p>

          {news.pictures && news.pictures.length > 0 && (
            <div className="mb-3">
              {news.pictures.map((pic, index) => (
                <img
                  key={index}
                  src={`http://localhost:5002${pic}`}
                  alt={`Picture ${news.title} ${index}`}
                  className="img-fluid rounded me-2"
                  style={{ maxWidth: "200px" }}
                />
              ))}
            </div>
          )}

          <p className="card-text">{news.text}</p>

          {news.tags && news.tags.length > 0 && (
            <div className="mb-3">
              Tags:
              {news.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-success me-2"
              onClick={async () => {
                const res = await axios.post(`${API_URL}/${id}/like`);
                setNews((prev) => ({ ...prev, likes: res.data.likes }));
              }}
            >
              👍 {news.likes}
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={async () => {
                const res = await axios.post(`${API_URL}/${id}/dislike`);
                setNews((prev) => ({ ...prev, likes: res.data.likes }));
              }}
              disabled={news.likes === 0}
            >
              👎
            </button>

            <span className="ms-3 text-muted">👁 Views: {news.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
