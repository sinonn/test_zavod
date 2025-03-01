import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5002/news/stats");

        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(null); // Reset stats on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        ← Back
      </button>
      <h1>News Statistics</h1>

      {loading ? (
        <p>Loading...</p>
      ) : stats ? (
        <table className="table">
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total News</td>
              <td>{stats.totalNews}</td>
            </tr>
            <tr>
              <td>Total Views</td>
              <td>{stats.totalViews}</td>
            </tr>
            <tr>
              <td>Total Likes</td>
              <td>{stats.totalLikes}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default NewsStats;
