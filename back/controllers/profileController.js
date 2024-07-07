import { UserModel } from "../models/User.js";
import path from "path";
import fs from "fs";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bio } = req.body;
    let profilePic = null;

    if (req.files && req.files.profilePic) {
      const profilePicFile = req.files.profilePic;
      const uploadPath = path.join(__dirname, "..", "uploads", profilePicFile.name);
      profilePic = `/uploads/${profilePicFile.name}`;

      // Save the file
      await profilePicFile.mv(uploadPath);
    }

    const updateFields = { bio };
    if (profilePic) {
      updateFields.profilePic = profilePic;
    }

    const user = await UserModel.findByIdAndUpdate(userId, updateFields, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
