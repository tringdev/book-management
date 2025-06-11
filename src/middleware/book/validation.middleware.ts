import { Request, Response, NextFunction } from "express";
import Author from '@/models/Author';

export const validateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, authorId, publishedYear } = req.body;

  // Validate title
  if (!title) {
    res.status(400).json({
      success: false,
      message: "Book title is required",
    });
    return;
  }

  if (typeof title !== "string" || title.trim().length < 2) {
    res.status(400).json({
      success: false,
      message: "Book title must be a string and at least 2 characters long",
    });
    return;
  }

  // Validate authorId
  if (!authorId) {
    res.status(400).json({
      success: false,
      message: "Author ID is required",
    });
    return;
  }

  // Check if author exists in the database
  try {
    const authorExists = await Author.findById(authorId);
    if (!authorExists) {
      res.status(404).json({
        success: false,
        message: "Author not found",
      });
      return;
    }
  } catch (error) {
    console.error('Error checking author existence:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while validating author'
    });
    return;
  }

  // Validate publishedYear if provided
  if (publishedYear !== undefined) {
    if (typeof publishedYear !== "number") {
      res.status(400).json({
        success: false,
        message: "Published year must be a number",
      });
      return;
    }

    const currentYear = new Date().getFullYear();
    if (publishedYear < 1000 || publishedYear > currentYear) {
      res.status(400).json({
        success: false,
        message: `Published year must be between 1000 and ${currentYear}`,
      });
      return;
    }
  }

  next();
};

