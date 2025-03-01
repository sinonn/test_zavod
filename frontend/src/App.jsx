import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewsDetail from "./components/NewsDetails";
import NewsForm from "./components/NewsForm";
import NewsList from "./components/NewsList";
import NewsStats from "./components/NewsStats";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            News
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/create" element={<NewsForm />} />
        <Route path="/stats" element={<NewsStats />} />
      </Routes>
    </Router>
  );
}

export default App;
