import { Schema, model, Types } from "mongoose";
interface IExpense {
  name: string;
  amountPaid: number;
  school: string;
  schoolId: string;
  status: string;
  year: Types.ObjectId;
  term: Types.ObjectId;
  month: number;
}
let instance: any;

class ExpenseSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public schema() {
    return new Schema(
      {
        name: {
          type: String,
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
          default: "success",
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
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "Admin",
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
let Expense = model("Expense", new ExpenseSchema().schema());
Expense.syncIndexes();
export { Expense };
