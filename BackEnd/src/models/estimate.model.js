import mongoose from 'mongoose';

/**
 * A saved cost-estimate lead: the calculated quote plus the visitor's
 * contact details so the sales team can follow up.
 */
const estimateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    spaceType: { type: String, required: true },
    packageKey: { type: String, required: true },
    areaSqft: { type: Number, required: true, min: 1 },
    estimatedMin: { type: Number, required: true },
    estimatedMax: { type: Number, required: true },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
  },
  { timestamps: true }
);

export const Estimate = mongoose.model('Estimate', estimateSchema);
