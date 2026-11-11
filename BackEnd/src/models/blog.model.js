import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true, maxlength: 400 },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: 'Nyulo Design Team' },
    readTimeMinutes: { type: Number, default: 5 },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
