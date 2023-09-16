"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
let transactionSchema = new mongoose_1.Schema({
    payerId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
let Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
exports.Transaction = Transaction;
