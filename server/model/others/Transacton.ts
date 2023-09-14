import { Schema, model } from "mongoose";

let transactionSchema = new Schema(
  {
    payerId: {
      type: Schema.Types.ObjectId,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    school: String,
    schoolId: String,
    status: {
      type: String,
      enum: ["success", "failed", "pending", "reversed", "complete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

let Transaction = model("Transaction", transactionSchema);
export { Transaction };
