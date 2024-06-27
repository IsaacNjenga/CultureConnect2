import express from "express";
import { ConversationModel } from "../models/Conversations.js";

const addConversation = async (req, res) => {
  try {
    const { category, title, thoughts, image } = req.body;
    const newConversation = new ConversationModel({
      category,
      title,
      thoughts,
      image,
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

export { addConversation, getConversations };
