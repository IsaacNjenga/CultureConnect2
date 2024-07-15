import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  gender: { type: String },
  ethnicity: { type: String },
  bio: { type: String },
  image: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const ProfileModel = new mongoose.model("profile", ProfileSchema);
export { ProfileModel };
