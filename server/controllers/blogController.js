import fs from 'fs';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import imagekit from '../configs/imageKit.js';

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog || '{}'
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: 'Missing required fields' });
    }

    // upload image to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs',
    });

    // optimized url via transformation
    const image = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: 1280 },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished: Boolean(isPublished),
    });

    return res.json({ success: true, message: 'Blog added successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    return res.json({ success: true, blogs });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }
    return res.json({ success: true, blog });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    return res.json({ success: true, message: 'Blog status updated' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.json({ success: false, message: 'id required'});
    const result = await Blog.findByIdAndDelete(id);
    if (!result) return res.json({ success: false, message: 'Blog not found' });
    return res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    if (!blogId || !name || !content) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const comment = await Comment.create({ blog: blogId, name, content });
    return res.json({ success: true, message: "Comment added for review", comment });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!blogId) {
      return res.json({ success: false, message: "blogId required" });
    }

    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Blog generation via Gemini
import main from "../configs/gemini.js";

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.json({ success: false, message: "prompt required" });
    }

    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};