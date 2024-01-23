import { NextFunction, Request, Response } from "express";

type Blog = {
  id: number;
  title: string;
  content: string;
};

let DUMMY_BLOGS: Blog[] = [];

export const getBlogPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (DUMMY_BLOGS.length === 0) {
    return res.status(404).json({
      message: "No blogs found",
    });
  }

  res.json({
    blogs: DUMMY_BLOGS,
  });
};

export const createBlogPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;

  DUMMY_BLOGS.push({
    id: DUMMY_BLOGS.length + 1,
    title,
    content,
  });

  res.status(201).json({
    message: "Blog created successfully",
  });
};

export const updateBlogPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const { title, content } = req.body;

  const foundBlog = DUMMY_BLOGS.find((blog) => blog.id === +blogId);
  if (!foundBlog) {
    return res.status(404).json({
      message: "blog not found",
    });
  }

  DUMMY_BLOGS = DUMMY_BLOGS.map((blog) => {
    if (blog.id === +blogId) {
      return {
        ...blog,
        title,
        content,
      };
    }
    return blog;
  });

  res.json({
    updatedBlogs: DUMMY_BLOGS,
  });
};

export const deleteBlogPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const foundBlog = DUMMY_BLOGS.find((blog) => blog.id === +blogId);

  if (!foundBlog) {
    return res.status(404).json({
      message: "blog not found",
    });
  }

  DUMMY_BLOGS = DUMMY_BLOGS.filter((blog) => blog.id !== +blogId);

  res.json({
    message: "blog deleted successfully",
  });
};
