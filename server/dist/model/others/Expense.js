"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const mongoose_1 = require("mongoose");
let instance;
class ExpenseSchema {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    schema() {
        return new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "AcademicYear",
                required: true,
            },
            term: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "AcademicTerm",
                required: true,
            },
            createdBy: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Admin",
            },
            month: {
                type: Number,
                default: new Date().getMonth(),
            },
            fees: {
                type: Number,
                default: 0,
            },
        }, {
            timestamps: true,
        });
    }
}
let Expense = (0, mongoose_1.model)("Expense", new ExpenseSchema().schema());
exports.Expense = Expense;
Expense.syncIndexes();
