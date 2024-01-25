import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

type Blog = {
  id: number;
  title: string;
  content: string;
};

let DUMMY_BLOGS: Blog[] = [];
const prisma = new PrismaClient();

export const getBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      comments: true,
    },
  });

  if (!posts || posts.length === 0) {
    return res.status(404).json({
      message: "No blogs found",
    });
  }

  return res.json({
    message: "All blogs",
    posts,
  });
};

export const createBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;

    const createdBlog = await prisma.blogPost.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: createdBlog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const { title, content } = req.body;

  const foundBlog = await prisma.blogPost.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!foundBlog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  const updatedPost = await prisma.blogPost.update({
    data: {
      title,
      content,
    },
    where: {
      id: blogId,
    },
  });

  res.json({
    message: "Blog updated successfully",
    updatedPost,
  });
};

export const deleteBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blogId } = req.params;
  const foundBlog = await prisma.blogPost.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!foundBlog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  const deletedPost = await prisma.blogPost.delete({
    where: {
      id: blogId,
    },
  });

  res.json({
    message: "blog deleted successfully",
    deletedPost,
  });
};
