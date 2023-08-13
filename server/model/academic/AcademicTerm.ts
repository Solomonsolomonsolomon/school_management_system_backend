import mongoose, { Schema, Types, model } from "mongoose";

interface ITerm {
  name: string;
  description?: string;
  duration: string;
  isCurrent: boolean;
  createdBy: Types.ObjectId;
}
const academicTermSchema = new Schema<ITerm>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
      default: "3 months",
    },
    isCurrent: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const AcademicTerm = model<ITerm>("AcademicTerm", academicTermSchema);
export { AcademicTerm };
