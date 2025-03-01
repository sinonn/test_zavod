import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  text: String,
  pictures: [String],
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model("News", newsSchema);
export default News;
