import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    titleId: { type: String, required: true },
  },
  { collection: "likeConversation" }
);

const likeModel = mongoose.model("like", likeSchema);
export { likeModel };
