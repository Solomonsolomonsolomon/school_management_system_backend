import { Schema, model, Types } from "mongoose";
interface ITransaction {
  payerId: Types.ObjectId;
  amountPaid: number;
  school: string;
  schoolId: string;
  status: string;
  year: Types.ObjectId;
  term: Types.ObjectId;
  month: number;
}
let instance: any;

class TransactionSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public schema() {
    return new Schema(
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
        year: {
          type: Schema.Types.ObjectId,
          ref: "AcademicYear",
          required: true,
        },
        term: {
          type: Schema.Types.ObjectId,
          ref: "AcademicTerm",
          required: true,
        },
        month: {
          type: Number,
          default: new Date().getMonth(),
        },
      },
      {
        timestamps: true,
      }
    );
  }
}
let Transaction = model("Transaction", new TransactionSchema().schema());
export { Transaction };
