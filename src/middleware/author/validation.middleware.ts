import { Request, Response, NextFunction } from "express";

export const validateAuthor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, age } = req.body;

  // Validate name
  if (!name) {
    res.status(400).json({
      success: false,
      message: "Name is required",
    });
    return;
  }

  if (typeof name !== "string") {
    res.status(400).json({
      success: false,
      message: "Name must be a string",
    });
    return;
  }

  if (name.trim().length < 2) {
    res.status(400).json({
      success: false,
      message: "Name must be at least 2 characters long",
    });
    return;
  }

  // Validate age if provided
  if (age !== undefined) {
    if (typeof age !== "number") {
      res.status(400).json({
        success: false,
        message: "Age must be a number",
      });
      return;
    }

    if (age < 0 || age > 150) {
      res.status(400).json({
        success: false,
        message: "Age must be between 0 and 150",
      });
      return;
    }
  }

  next();
};
