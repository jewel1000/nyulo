import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    description: { type: String, required: true },
    icon: { type: String, default: 'sparkles' },
    features: { type: [String], default: [] },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);
