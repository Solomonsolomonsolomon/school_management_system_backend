import mongoose, { Schema, Types, model, Document } from "mongoose";
interface IResultGrades extends Document {
  CA1?: number;
  CA2?: number;
  examScore?: number;
  total?: number;
  subjectId?: Types.ObjectId;
  letterGrade: string;
  _id?: Types.ObjectId;
}
interface IResult extends Document {
  name: string;
  studentId: string;
  id?: Types.ObjectId;
  totalScore?: number;
  position?: number;
  year?:Types.ObjectId;
  term?: Types.ObjectId;
  class?: string;
  average?: number;
  overallGrade?: string;
  grades?: IResultGrades;
  status: string;
}
let resultSchema = new Schema<IResult>({
  name: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  id: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  totalScore: {
    type: Number,
  },
  position: {
    type: Number,
  },
  class: {
    type: String,
  },
  year: {
    type: Schema.Types.ObjectId,
    ref:"AcademicYear"
  },
  term: {
    type: Schema.Types.ObjectId,
    ref:"AcademicTerm"
  },
  average: {
    type: Number,
  },
  grades: [{}],
  overallGrade: {
    type: String,
  },
  status: {
    type: String,
    enum: ["failed", "passed"],
    default: "failed",
  },
});
resultSchema.pre("save", async function (this: IResult, next) {
    console.log('hitting')
  this.overallGrade == "F"
    ? (this.status = "failed")
    : (this.status = "passed");
  next();
});
const Result = model("Result", resultSchema);
export { Result };
