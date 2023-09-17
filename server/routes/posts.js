import express from "express";
import { getFeedPosts, getUserPosts, likePosts, postComment } from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";
import { postDelete } from "../controllers/posts.js";

const router = express.Router();

/* READ */
 
router.get("/", verifyToken, getFeedPosts );
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePosts);
router.patch("/:id/comments", verifyToken, postComment);

router.delete("/:id", verifyToken, postDelete);

export default router;