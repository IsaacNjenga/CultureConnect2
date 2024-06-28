import express from "express";
import { ConversationModel } from "../models/Conversations.js";
import { CommentModel } from "../models/Comments.js";

const addConversation = async (req, res) => {
  try {
    const { category, title, thoughts, image, author } = req.body;
    const newConversation = new ConversationModel({
      category,
      title,
      thoughts,
      image,
      author,
      postedBy: req.user._id,
    });
    const result = await newConversation.save();
    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await ConversationModel.find({});
    return res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getConversation = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const conversation = await ConversationModel.findById(id);
    if (!conversation) {
      return res.status(404).json({ error: "Post does not exist" });
    }
    return res.status(200).json({
      success: true,
      conversation: {
        image: conversation.image,
        title: conversation.title,
        category: conversation.category,
        thoughts: conversation.thoughts,
        author: conversation.author,
      },
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteConversation = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const conversation = await ConversationModel.findById(id);
    if (!conversation) {
      return res.status(404).json({ error: "Post does not exist" });
    }
    const deleteRecord = await ConversationModel.findByIdAndDelete({ _id: id });
    const conversations = await ConversationModel.find({
      postedBy: req.user._id,
    });
    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateConversation = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "No ID specified" });
  }
  try {
    const result = await ConversationModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ error: error.message });
  }
};

//fetching a comment
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

export {
  addConversation,
  getConversations,
  getConversation,
  deleteConversation,
  updateConversation,
  createComment,
  getComments,
};
