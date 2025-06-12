import { Request, Response } from 'express';
import Book from '../../models/Book';
import { AuthRequest } from '../../middleware/auth/auth.middleware';

// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorId, title, page = 1, limit = 10 } = req.query;
    let query: any = {};

    if (authorId) {
      query.authorId = authorId;
    }

    if (title) {
      query.title = { $regex: title, $options: 'i' }; 
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const [totalBooks, books] = await Promise.all([
      Book.countDocuments(query),
      Book.find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .populate('authorId', 'name')
        .populate('userId', 'email'),
    ]);

    res.status(200).json({
      success: true,
      total: totalBooks,
      page: pageNumber,
      data: books,
    });
  } catch (error) {
    console.error('Error getting list books:', error);
    res.status(500).json({ success: false, message: 'Error getting list books' });
  }
};

// Get single book by ID
export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id).populate('authorId', 'name').populate('userId', 'email');
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error('Error getting book:', error);
    res.status(500).json({ success: false, message: 'Error getting book' });
  }
};

// Create new book
export const createBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const book = await Book.create({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ success: false, message: 'Error creating book' });
  }
};

// Update book
export const updateBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }

    // Check if user owns this book
    if (book.userId.toString() !== req.userId) {
      res.status(403).json({ success: false, message: 'You are not authorized to update this book' });
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ success: false, message: 'Error updating book' });
  }
};

// Delete book
export const deleteBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }

    // Check if user owns this book
    if (book.userId.toString() !== req.userId) {
      res.status(403).json({ success: false, message: 'You are not authorized to delete this book' });
      return;
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ success: false, message: 'Error deleting book' });
  }
}; 