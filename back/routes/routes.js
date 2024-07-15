import express from "express";
import { Register, Login, Auth } from "../controllers/userController.js";
const router = express.Router();
import { body } from "express-validator";
import { VerifyUser } from "../middleware/verifyUser.js";

import {
  addConversation,
  getConversations,
  getConversation,
  deleteConversation,
  updateConversation,
} from "../controllers/conversationController.js";

import {
  likePost,
  unlikePost,
  likedPosts,
  getLikesCount,
} from "../controllers/likeController.js";

import {
  createComment,
  getComments,
  getCommentsCount,
  deleteComment,
} from "../controllers/commentsController.js";

import {
  createProfile,
  getProfile,
  updateProfile,
  getUserProfile,
} from "../controllers/profileController.js";

router.post(
  "/register",
  [
    (body("name")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("Invalid e-mail address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password length should be 8-30 characters")),
  ],
  Register
);

router.post(
  "/login",
  [
    (body("email")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isEmail()
      .withMessage("Invalid e-mail address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("This field should not be empty")
      .isLength({ min: 8, max: 30 })
      .withMessage("Password length should be 8-30 characters")),
  ],
  Login
);

router.get("/verify", VerifyUser, Auth);

//profile route
router.get("/profile", VerifyUser, getProfile);
router.put("/profile-update/:id", VerifyUser, updateProfile);
router.post("/create-profile", VerifyUser, createProfile);
router.get("/profile/:id", VerifyUser, getUserProfile);

//conversation Routes
router.post("/addConversation", VerifyUser, addConversation);
router.get("/conversations", VerifyUser, getConversations);
router.get("/conversation/:id", VerifyUser, getConversation);
router.put("/update-conversation/:id", VerifyUser, updateConversation);
router.delete("/conversation/:id", VerifyUser, deleteConversation);

//comment routes
router.post("/comments", VerifyUser, createComment);
router.get("/comments/:conversationId", VerifyUser, getComments);
router.get("/comments/count/:conversationId", VerifyUser, getCommentsCount);
router.delete("/comments/:conversationId", VerifyUser, deleteComment);

//like routes
router.post("/like", VerifyUser, likePost);
router.get("/likes/:conversationId", VerifyUser, likedPosts);
router.get("/likes/count/:conversationId", VerifyUser, getLikesCount);
router.delete("/unlike/:conversationId", VerifyUser, unlikePost);

export { router as Router };
