import { CommentModel } from "../models/Comments.js";

const createComment = async (req, res) => {
  const { content, author, conversationId } = req.body;
  try {
    const newComment = await CommentModel({ content, author, conversationId });
    await newComment.save();
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const comments = await CommentModel.find({ conversationId });
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getCommentsCount = async (req, res) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const count = await CommentModel.countDocuments({ conversationId });
    return res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const comments = await CommentModel.find({ conversationId });
    const deleteRecord = await CommentModel.findByIdAndDelete({
      _id: conversationId,
    });
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { createComment, getComments, getCommentsCount, deleteComment };
