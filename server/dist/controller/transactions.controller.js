"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../middleware/decorators");
const database_1 = require("../model/database");
class TransactionController {
    constructor() {
        this.createTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { payerId, amount } = req.body;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            if (!payerId || !amount || isNaN(amount) || amount <= 0)
                throw new decorators_1.CustomError({}, "invalid transaction details", 400);
            const student = yield database_1.Student.findById(payerId);
            if (!student)
                throw new decorators_1.CustomError({}, "student not found", 404);
            const transaction = new database_1.Transaction({
                payerId,
                amountPaid: amount,
                status: "pending",
                school,
                schoolId,
            });
            yield transaction.save();
            return res.status(201).json({
                status: 201,
                msg: "Transaction created successfully",
                transaction,
            });
        });
        // Get all transactions
        this.getAllTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            let school = (_c = req.user) === null || _c === void 0 ? void 0 : _c.school;
            let schoolId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.schoolId;
            const transactions = yield database_1.Transaction.find({ school, schoolId });
            if (!transactions.length)
                throw new decorators_1.CustomError({}, "no transactions found", 404);
            return res.status(200).json({ msg: "all transactions", transactions });
        });
        // Get transactions for a specific student
        this.getTransactionsByStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _id } = req.params;
            const transactions = yield database_1.Transaction.find({ payerId: _id });
            res.status(200).json({
                msg: "completed transactions",
                status: 200,
                transactions: transactions,
            });
        });
        this.getAllCompletedTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f;
            let school = (_e = req.user) === null || _e === void 0 ? void 0 : _e.school;
            let schoolId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.schoolId;
            const completedTransactions = yield database_1.Transaction.find({
                status: "success",
                school,
                schoolId,
            });
            res.status(200).json({
                msg: "completed transactions",
                status: 200,
                transactions: completedTransactions,
            });
        });
        // Get total amount from all completed transactions
        this.getTotalAmountFromCompletedTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _g, _h;
            let school = (_g = req.user) === null || _g === void 0 ? void 0 : _g.school;
            let schoolId = (_h = req.user) === null || _h === void 0 ? void 0 : _h.schoolId;
            const completedTransactions = yield database_1.Transaction.find({
                status: "success",
                school,
                schoolId,
            });
            // Calculate the total amount
            const totalAmount = completedTransactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0);
            res.status(200).json({
                status: 200,
                msg: "total transaction amount fetched successfully",
                amount: totalAmount,
            });
        });
    }
}
exports.default = TransactionController;
