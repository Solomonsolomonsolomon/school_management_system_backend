import mongoose, {
  Schema,
  Types,
  model,
  Document,
  PopulatedDoc,
} from "mongoose";
import { IYear } from "./AcademicYear";
import { ITerm } from "./AcademicTerm";
interface IResultGrades extends Document {
  CA1?: number;
  CA2?: number;
  CA3?: number;
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
  school?: string;
  schoolId?: string;
  year?: PopulatedDoc<IYear & Document>;
  term?: PopulatedDoc<ITerm & Document>;
  class?: string;
  average?: number;
  overallGrade?: string;
  grades?: IResultGrades[];
  status: string;
  totalTerms?: number;
}
let gradesSchema = new Schema<IResultGrades>({
  CA1: Number,
  CA2: Number,
  CA3: Number,
  examScore: Number,
  total: Number,
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
  },
  letterGrade: String,
});
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
  school: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  year: {
    type: Schema.Types.ObjectId,
    ref: "AcademicYear",
  },
  term: {
    type: Schema.Types.ObjectId,
    ref: "AcademicTerm",
  },
  average: {
    type: Number,
  },
  grades: [
    {
      type: gradesSchema,
    },
  ],
  overallGrade: {
    type: String,
  },
  status: {
    type: String,
    enum: ["failed", "passed"],
    default: "failed",
  },
  totalTerms: {
    type: Number,
    default:0,
    required:true
  },
});

resultSchema.pre("save", async function (this: IResult, next) {
  console.log("hitting");
  this.overallGrade === "F"
    ? (this.status = "failed")
    : (this.status = "passed");
  next();
});
const Result = model("Result", resultSchema);
export { Result };
