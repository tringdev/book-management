import mongoose, { Document, Schema } from 'mongoose';

export interface Book extends Document {
  title: string;
  authorId: mongoose.Types.ObjectId;
  description?: string;
  publishedYear: number;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear()
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.index({ title: 1, authorId: 1 }, { unique: true });
BookSchema.index({ userId: 1 });
BookSchema.index({ authorId: 1 });

export default mongoose.model<Book>('Book', BookSchema); 