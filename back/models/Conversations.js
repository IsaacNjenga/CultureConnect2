import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    category: { type: String, require: true },
    title: { type: String, require: true },
    thoughts: { type: String, require: true },
    image: { type: String },
    author: { type: String, require: true },
  },
  { collection: "conversations" }
);

const ConversationModel = mongoose.model("Conversation", ConversationSchema);
export { ConversationModel };
