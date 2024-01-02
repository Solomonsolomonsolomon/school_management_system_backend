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
const Expense_1 = require("../model/others/Expense");
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
                status: "pending", // Set the initial status to "pending"
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
            const { term } = req.params;
            const filter = { school, schoolId };
            if (term) {
                let filterTerm = yield database_1.AcademicTerm.findOne({
                    school,
                    schoolId,
                    isCurrent: true,
                });
                if (!filterTerm)
                    throw new decorators_1.CustomError({}, "term not found", 500);
                filter.term = filterTerm._id;
            }
            const transactions = yield database_1.Transaction.find(filter);
            if (!transactions.length)
                throw new decorators_1.CustomError({}, "no transactions found", 404);
            return res.status(200).json({ msg: "all transactions", transactions });
        });
        // Get transactions for a specific student
        this.getTransactionsByStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f;
            const { _id } = req.params;
            let { term, status } = req.query;
            const filter = { payerId: _id };
            let school = (_e = req.user) === null || _e === void 0 ? void 0 : _e.school;
            let schoolId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.schoolId;
            if (term) {
                let filterTerm = yield database_1.AcademicTerm.findOne({
                    school,
                    schoolId,
                    isCurrent: true,
                });
                if (!filterTerm)
                    throw new Error("current term not found");
                filter.term = filterTerm._id;
            }
            if (status)
                filter.status = status;
            const transactions = yield database_1.Transaction.find(filter);
            res.status(200).json({
                msg: "completed transactions",
                status: 200,
                transactions: transactions,
            });
        });
        this.getAllCompletedTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _g, _h;
            let school = (_g = req.user) === null || _g === void 0 ? void 0 : _g.school;
            let schoolId = (_h = req.user) === null || _h === void 0 ? void 0 : _h.schoolId;
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
            var _j, _k;
            let school = (_j = req.user) === null || _j === void 0 ? void 0 : _j.school;
            let schoolId = (_k = req.user) === null || _k === void 0 ? void 0 : _k.schoolId;
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
        this.getTotalAmountAndMonthPaid = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _l, _m, _o, _p, _q;
            let school = (_l = req.user) === null || _l === void 0 ? void 0 : _l.school;
            let schoolId = (_m = req.user) === null || _m === void 0 ? void 0 : _m.schoolId;
            const completedTransactions = yield database_1.Transaction.find({
                status: "success",
                school,
                schoolId,
            });
            const totalAmount = completedTransactions.reduce((prev, current, i) => {
                return [
                    ...prev,
                    {
                        amount: prev[i].amount + current.amountPaid,
                        month: current.month,
                    },
                ];
            }, [{ amount: 0, month: 0 }]);
            let total = completedTransactions.reduce((p, c) => {
                const { amountPaid, month } = c;
                const i = p.tracker.get(month);
                if (amountPaid) {
                    if (i) {
                        p.total[i].amount += amountPaid;
                    }
                    else {
                        p.tracker.set(month, p.total.length);
                        p.total.push({ month, amount: amountPaid });
                    }
                }
                else {
                    return p;
                }
                return p;
            }, {
                total: [{ amount: 0, month: 0 }],
                tracker: new Map(),
            }).total;
            console.log(total);
            let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i <= total.length - 1; i++) {
                months[(_o = total[i]) === null || _o === void 0 ? void 0 : _o.month] = ((_p = total[i]) === null || _p === void 0 ? void 0 : _p.amount) || 0;
                console.log((_q = total[i]) === null || _q === void 0 ? void 0 : _q.month);
            }
            res.status(200).json({
                status: 200,
                msg: "total transaction amount fetched successfully",
                label: months,
            });
        });
        this.getRatioOfEarningsToExpense = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _r, _s;
            let school = (_r = req.user) === null || _r === void 0 ? void 0 : _r.school;
            let schoolId = (_s = req.user) === null || _s === void 0 ? void 0 : _s.schoolId;
            const completedTransactions = yield database_1.Transaction.find({
                status: "success",
                school,
                schoolId,
            });
            let allExpenses = yield Expense_1.Expense.find({});
            // Calculate the total amount
            const totalAmount = completedTransactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0);
            const totalExpenses = allExpenses.reduce((sum, expense) => sum + expense.amountPaid, 0);
            res.status(200).json({
                status: 200,
                msg: "total transaction amount fetched successfully",
                ratio: [totalAmount, totalExpenses],
            });
        });
    }
}
exports.default = TransactionController;
