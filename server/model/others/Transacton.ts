import { Schema, model } from "mongoose";

let transactionSchema = new Schema({
  payerId: String,
  amountPaid: {
    type: Number,
  },
  school: String,
  schoolId: String,
  status: {
    type: String,
    enum: ["success", "failure", "pending"],
  },
});

let Transaction = model("Transaction", transactionSchema);
export {Transaction};
