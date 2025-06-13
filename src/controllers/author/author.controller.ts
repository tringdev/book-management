import { Request, Response } from "express";
import Author from "@/models/Author";
import Book from "@/models/Book";
import { AuthRequest } from "@/middleware/auth/auth.middleware";

// Get all authors
export const getAllAuthors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, page = 1, limit = 10 } = req.query;
    let query: any = {};

    if (title) {
      query.name = { $regex: title, $options: "i" };
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const [totalAuthors, authors] = await Promise.all([
      Author.countDocuments(query),
      Author.find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber),
    ]);

    res.status(200).json({
      success: true,
      total: totalAuthors,
      page: pageNumber,
      data: authors,
    });
  } catch (error) {
    console.error("Error getting authors:", error);
    res.status(500).json({
      success: false,
      message: "Error getting authors",
    });
  }
};

// Get single author
export const getAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.status(404).json({
        success: false,
        message: "Author not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: author,
    });
  } catch (error) {
    console.error("Error getting author:", error);
    res.status(500).json({
      success: false,
      message: "Error getting author",
    });
  }
};

// Create new author
export const createAuthor = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const author = await Author.create({
      ...req.body,
      userId: req.userId, // From JWT token
    });

    res.status(201).json({
      success: true,
      data: author,
    });
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({
      success: false,
      message: "Error creating author",
    });
  }
};

// Update author
export const updateAuthor = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      res.status(404).json({
        success: false,
        message: "Author not found",
      });
      return;
    }

    // Check if user owns this author
    if (author.userId.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to update this author",
      });
      return;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedAuthor,
    });
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({
      success: false,
      message: "Error updating author",
    });
  }
};

// Delete author and their books
export const deleteAuthor = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      res.status(404).json({
        success: false,
        message: "Author not found",
      });
      return;
    }

    // Check if user owns this author
    if (author.userId.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this author",
      });
      return;
    }

    // Delete author
    await Author.findByIdAndDelete(req.params.id);

    // Delete all books by this author
    await Book.deleteMany({ authorId: req.params.id });

    res.status(200).json({
      success: true,
      message: "Author and their books deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting author",
    });
  }
};
