import mongoose, { Schema, Types, model } from "mongoose";

let gradesSchema = new Schema({
  studentId: {
    type: Types.ObjectId,
    ref: "Student",
  },
  year: {
    type: String,
  },
  term: {
    type: String,
    enum: [1, 2, 3],
  },
  grades: [
    {
      CA1: Number,
      CA2: Number,
      CA3: Number,

      examScore: Number,
      subjectId: {
        type: Types.ObjectId,
        ref: "Subject",
      },
      total: {
        type: Number,
        default: 0,
      },
    },
  ],
});
let Grades = model("Grades", gradesSchema);
export { Grades };
