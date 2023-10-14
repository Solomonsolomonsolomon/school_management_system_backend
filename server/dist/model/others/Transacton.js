"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
let instance;
class TransactionSchema {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    schema() {
        return new mongoose_1.Schema({
            payerId: {
                type: mongoose_1.Schema.Types.ObjectId,
            },
            amountPaid: {
                type: Number,
                default: 0,
            },
            school: String,
            schoolId: String,
            name: String,
            status: {
                type: String,
                enum: ["success", "failed", "pending", "reversed", "complete"],
                default: "pending",
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
            month: {
                type: Number,
                default: new Date().getMonth(),
            },
        }, {
            timestamps: true,
        });
    }
}
let Transaction = (0, mongoose_1.model)("Transaction", new TransactionSchema().schema());
exports.Transaction = Transaction;
