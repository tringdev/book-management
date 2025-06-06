import mongoose, { Document, Schema } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  description?: string;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    publishedYear: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Book>('Book', BookSchema); 