import mongoose, { Schema, Types, model } from "mongoose";

let resultSchema = new Schema({
  studentId: {
    type: Types.ObjectId,
    required: true,
  },
  average: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["failed", "passed"],
    default: "failed",
  },
});

const Result = model("Result", resultSchema);
export { Result };
