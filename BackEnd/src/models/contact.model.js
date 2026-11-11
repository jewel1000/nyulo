import mongoose from 'mongoose';
import { CONTACT_STATUSES, SERVICE_INTERESTS } from '../constants/index.js';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    serviceInterest: { type: String, enum: SERVICE_INTERESTS, default: 'Other' },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 3000 },
    status: { type: String, enum: CONTACT_STATUSES, default: 'new', index: true },
  },
  { timestamps: true }
);

export const Contact = mongoose.model('Contact', contactSchema);
