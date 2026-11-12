import mongoose from 'mongoose';

/** One document per editable site section (company, hero, stats, …). */
const settingSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, unique: true, index: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Setting = mongoose.model('Setting', settingSchema);
