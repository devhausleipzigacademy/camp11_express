import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { BlogSchema } from "../schema/blog.schema";

export async function blogValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    BlogSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(422).json(err);
  }
}
