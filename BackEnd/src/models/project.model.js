import mongoose from 'mongoose';
import { PROJECT_CATEGORIES } from '../constants/index.js';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, enum: PROJECT_CATEGORIES, index: true },
    location: { type: String, required: true, trim: true },
    areaSqft: { type: Number, required: true, min: 1 },
    year: { type: Number, required: true },
    client: { type: String, trim: true },
    description: { type: String, required: true },
    scope: { type: [String], default: [] },
    coverImage: { type: String, required: true },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
