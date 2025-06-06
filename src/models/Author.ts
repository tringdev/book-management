import mongoose, { Document, Schema } from 'mongoose';

export interface Author extends Document {
  name: string;
  age?: number;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true 
});

AuthorSchema.index({ name: 1 });
AuthorSchema.index({ userId: 1 });

export default mongoose.model<Author>('Author', AuthorSchema); 