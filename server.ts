import "dotenv/config";
import express from "express";
import { blogValidation } from "./middleware/blog.middleware";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPost,
  updateBlogPost,
} from "./controllers/blog.controllers";
import { createComment } from "./controllers/comment.controllers";

const PORT = process.env.PORT;
const app = express();

app.use(
  express.json({
    limit: "3mb",
  })
);

app.use((req, res, next) => {
  console.log("This always runs");
  next();
});

app.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

app.get("/blog", getBlogPost);

app.post("/blog", blogValidation, createBlogPost);

app.patch("/blog/:blogId", blogValidation, updateBlogPost);

app.delete("/blog/:blogId", deleteBlogPost);

app.post("/comment/:blogId", createComment);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
