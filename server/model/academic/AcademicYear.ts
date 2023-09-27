import mongoose, { Document } from "mongoose";

interface IYear extends Document {
  name: string;
  fromYear: string;
  toYear: string;
  school?: string;
  schoolId: string;
  plan?: string;
  isCurrent: boolean;
  createdByBot?: string;
  createdBy?: mongoose.Types.ObjectId;
  students?: mongoose.Types.ObjectId[];
  teachers?: mongoose.Types.ObjectId[];
  updatedBy?: mongoose.Types.ObjectId;
}
const academicYearSchema = new mongoose.Schema<IYear>(
  {
    name: {
      type: String,
      required: true,
    },
    fromYear: {
      type: String,
      required: true,
    },
    toYear: {
      type: String,
      required: true,
    },
    school: {
      type: String,
    },
    schoolId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["basic", "standard", "advanced"],
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    createdByBot: {
      type: Boolean,
      default: false,
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    //Finance
    //Librarian
    //......
  },
  {
    timestamps: true,
  }
);

//model
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);
AcademicYear.syncIndexes();
export { AcademicYear, IYear };
