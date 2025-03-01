import axios from "axios";

export const API_URL = "http://localhost:5002/news";

// Fetch news with pagination
export const fetchNews = async (
  page,
  setNews,
  setPage,
  loading,
  setLoading
) => {
  if (loading) return;
  setLoading(true);
  try {
    const res = await axios.get(`${API_URL}?page=${page}&limit=3`);
    setNews((prev) => {
      const existingIds = new Set(prev.map((item) => item._id));
      const newData = res.data.filter((item) => !existingIds.has(item._id));
      return [...prev, ...newData];
    });
    setPage(page + 1);
  } catch (error) {
    console.error("Error fetching news", error);
  }
  setLoading(false);
};

// Delete news
export const deleteNews = async (id, setNews) => {
  if (window.confirm("Are you sure you want to delete this news?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNews((prevNews) => prevNews.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting news", error);
    }
  }
};

// Like news
export const handleLike = async (id, setNews) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/like`);
    setNews((prevNews) =>
      prevNews.map((item) =>
        item._id === id ? { ...item, likes: res.data.likes } : item
      )
    );
  } catch (error) {
    console.error("Error liking news", error);
  }
};

// Dislike news
export const handleDislike = async (id, setNews) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/dislike`);
    setNews((prevNews) =>
      prevNews.map((item) =>
        item._id === id ? { ...item, likes: res.data.likes } : item
      )
    );
  } catch (error) {
    console.error("Error disliking news", error);
  }
};

// Increment views
export const handleReadMore = async (id) => {
  try {
    await axios.post(`${API_URL}/${id}/view`);
  } catch (error) {
    console.error("Error updating views", error);
  }
};
