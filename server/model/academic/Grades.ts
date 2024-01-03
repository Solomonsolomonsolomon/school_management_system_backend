import mongoose, { Schema, Types, model, Document } from "mongoose";
import { School } from "../database";
import { CustomError } from "../../utils/globalErrorHandler";

interface INestedgrades extends Document {
  subjectId: Types.ObjectId;
  total: number;
  CA1?: number;
  CA2?: number;
  CA3?: number;
  examScore?: number;
  letterGrade?: string;
}
interface IGrades extends Document {
  studentId: Types.ObjectId;
  className?: string;
  year: mongoose.Types.ObjectId;
  term: mongoose.Types.ObjectId;
  school: string;
  schoolId: string;
  plan: string;
  grades: INestedgrades[];
}
let gradesSchema = new Schema<IGrades>({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  className: {
    type: String,
  },
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicTerm",
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
  grades: [
    {
      CA1: Number,
      CA2: Number,
      CA3: Number,
      examScore: Number,
      subjectId: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
      total: {
        type: Number,
        default: 0,
      },
      letterGrade: {
        type: String,
      },
    },
  ],
});

gradesSchema.pre("save", async function (this: IGrades, next) {
  let grades = this.grades;
  function calculateTotal(scores: any, total = 0) {
    for (let i in scores) {
      typeof scores[i] == "number" ? (total += scores[i]) : (total += 0);
    }
    return total;
  }
  let schoolToCompare = await School.findOne({
    school: this.school,
    schoolId: this.schoolId,
  });
  if (!schoolToCompare)
    throw new CustomError(
      {},
      "cannot add grades until school completes registration",
      400
    );
  for (let grade of grades) {
    let total = calculateTotal([
      grade.CA1,
      grade.CA2,
      grade.CA3,
      grade.examScore,
    ]);
    grade.total = total;
    console.log(grade.total);
    let A = schoolToCompare.gradePoints?.A || 75;
    let B = schoolToCompare.gradePoints?.B || 60;
    let C = schoolToCompare.gradePoints?.C || 50;
    let D = schoolToCompare.gradePoints?.D || 40;
    if (grade!.total >= A) {
      grade!.letterGrade = "A";
    } else if (grade!.total >= B) {
      grade!.letterGrade = "B";
    } else if (grade!.total >= C) {
      grade!.letterGrade = "C";
    } else if (grade!.total >= D) {
      grade!.letterGrade = "D";
    } else {
      grade!.letterGrade = "F";
    }
  }

  next();
});
let Grades = model("Grades", gradesSchema);
Grades.syncIndexes();
export { Grades };
