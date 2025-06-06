import { Request, Response } from 'express';
import Author from '../../models/Author';
import Book from '../../models/Book';
import { AuthRequest } from '../../middleware/auth/auth.middleware';

// Get all authors
export const getAllAuthors = async (req: Request, res: Response): Promise<void> => {
  try {
    const authors = await Author.find();
    res.status(200).json({
      success: true,
      data: authors
    });
  } catch (error) {
    console.error('Error getting authors:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting authors'
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
        message: 'Author not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: author
    });
  } catch (error) {
    console.error('Error getting author:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting author'
    });
  }
};

// Create new author
export const createAuthor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const author = await Author.create({
      ...req.body,
      userId: req.userId 
    });

    res.status(201).json({
      success: true,
      data: author
    });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating author'
    });
  }
};

// Update author
export const updateAuthor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      res.status(404).json({
        success: false,
        message: 'Author not found'
      });
      return;
    }

    // Check if user owns this author
    if (author.userId.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to update this author'
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
      data: updatedAuthor
    });
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating author'
    });
  }
};

// Delete author and their books
export const deleteAuthor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const author = await Author.findById(req.params.id);
    
    if (!author) {
      res.status(404).json({
        success: false,
        message: 'Author not found'
      });
      return;
    }

    // Check if user owns this author
    if (author.userId.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this author'
      });
      return;
    }

    // Start a session for transaction
    const deleteSession = await Author.startSession();
    deleteSession.startTransaction();

    try {
      // Delete author
      await Author.findByIdAndDelete(req.params.id).session(deleteSession);
      
      // Delete all books by this author
      await Book.deleteMany({ authorId: req.params.id }).session(deleteSession);
      
      await deleteSession.commitTransaction();
      
      res.status(200).json({
        success: true,
        message: 'Author and their books deleted successfully'
      });
    } catch (error) {
      await deleteSession.abortTransaction();
      throw error;
    } finally {
      deleteSession.endSession();
    }
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting author'
    });
  }
}; 