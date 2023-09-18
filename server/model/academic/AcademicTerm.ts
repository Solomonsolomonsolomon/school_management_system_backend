import mongoose, { Schema, Types, model } from "mongoose";
interface ITerm {
  name: string;
  description?: string;
  duration: string;
  school: string;
  schoolId:string,
  plan: string;
  isCurrent: boolean;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}
const academicTermSchema = new Schema<ITerm>(
  {
    name: {
      type: String,
     
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

    school: {
      type: String,
    },
    schoolId:{
      type:String,
      required:true
    },
    plan: {
      type: String,
      enum: ["basic", "standard", "advanced"],
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const AcademicTerm = model<ITerm>("AcademicTerm", academicTermSchema);
AcademicTerm.syncIndexes();
export { AcademicTerm };
