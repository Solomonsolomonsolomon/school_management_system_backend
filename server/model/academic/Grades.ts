import mongoose, { Schema, Types, model, Document } from "mongoose";

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
  year: string;
  term: string;
  school: string;
  plan: string;
  grades: INestedgrades[];
}
let gradesSchema = new Schema<IGrades>({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  year: {
    type: String,
  },
  term: {
    type: String,
  },
  school: {
    type: String,
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

gradesSchema.pre("save", function (this: IGrades, next) {
  let grades = this.grades;
  function calculateTotal(scores: any, total = 0) {
    for (let i in scores) {
      typeof scores[i] == "number" ? (total += scores[i]) : (total += 0);
    }
    return total;
  }
  for (let grade of grades) {
    let total = calculateTotal([
      grade.CA1,
      grade.CA2,
      grade.CA3,
      grade.examScore,
    ]);
    grade.total = total;
    grade.total >= 75
      ? (grade.letterGrade = "A")
      : grade.total >= 60 && grade.total < 75
      ? (grade.letterGrade = "B")
      : grade.total >= 50 && grade.total < 60
      ? (grade.letterGrade = "C")
      : grade.total > 40 && grade.total <= 49
      ? (grade.letterGrade = "D")
      : (grade.letterGrade = "F");
  }
  next();
});
let Grades = model("Grades", gradesSchema);
Grades.syncIndexes()
export { Grades };
