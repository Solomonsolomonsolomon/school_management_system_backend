import mongoose, { Schema, Types, model } from "mongoose";

let resultSchema = new Schema({
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
  average: {
    type: Number,
  },
  grades: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["failed", "passed"],
    default: "failed",
  },
});
const Result = model("Result", resultSchema);
export { Result };
