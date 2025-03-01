import multer from "multer";
import path from "path";
import News from "../models/newsModel.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const createNews = async (req, res) => {
  try {
    const pictures = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];
    const news = new News({ ...req.body, pictures });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNewsByTag = async (req, res) => {
  try {
    const news = await News.find({ tags: req.params.tag }).sort({
      createdAt: -1,
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likeNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const dislikeNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const incrementViews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNewsStats = async (req, res) => {
  try {
    const totalNews = await News.countDocuments();
    const totalViews = await News.aggregate([
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]);
    const totalLikes = await News.aggregate([
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]);

    res.json({
      totalNews,
      totalViews: totalViews.length > 0 ? totalViews[0].total : 0,
      totalLikes: totalLikes.length > 0 ? totalLikes[0].total : 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
