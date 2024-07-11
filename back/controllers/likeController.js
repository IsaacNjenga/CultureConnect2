import express from "express";
import { likeModel } from "../models/likeConversation.js";

const likePost = async (req, res) => {
  const { userId, title, user, titleId } = req.body;
  if (!userId || !title || !user || !titleId) {
    return res
      .status(400)
      .json({ message: "userId, username and title are required" });
  }
  try {
    const newLike = new likeModel({ userId, title, user, titleId });
    const savedLike = await newLike.save();
    res.json(savedLike);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const likedPosts = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const likes = await likeModel.find({ titleId: conversationId });
    return res.status(200).json({ success: true, likes });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const unlikePost = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const deletedLike = await likeModel.findByIdAndDelete({
      _id: conversationId,
    });
    res.json(deletedLike);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

const getLikesCount = async (req, res) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const count = await likeModel.countDocuments({ titleId: conversationId });
    return res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return res.status(500).json({ error: error.message });
  }
};

export { likePost, unlikePost, likedPosts, getLikesCount };
