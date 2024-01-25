import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content } = req.body;
  const { blogId } = req.params;

  const createComment = await prisma.comment.create({
    data: {
      content,
      blogPostId: blogId,
    },
  });

  res.status(201).json({
    message: "Comment created successfully",
    createComment,
  });
};
