import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { required: true, type: String },
  enthnicity: { required: true, type: String },
  bio: { type: String },
  image: { type: String },
});

const ProfileModel = new mongoose.model("profile", ProfileSchema);
export { ProfileModel };
