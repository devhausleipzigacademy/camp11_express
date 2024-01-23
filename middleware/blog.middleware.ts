import { NextFunction, Request, Response } from "express";

export async function blogValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, content } = req.body;
  if (title.length < 5 || content.length < 5) {
    return res.status(422).json({
      message: "Invalid input",
    });
  }

  next();
}
