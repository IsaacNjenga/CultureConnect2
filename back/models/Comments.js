import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  conversationId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model("comment", CommentSchema);
export { CommentModel };
