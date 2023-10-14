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
class ExpenseController {
    addExpense(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let term = yield database_1.AcademicTerm.findOne({
                school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
                schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
                isCurrent: true,
            });
            let year = yield database_1.AcademicYear.findOne({
                school: (_c = req.user) === null || _c === void 0 ? void 0 : _c.school,
                schoolId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.schoolId,
                isCurrent: true,
            });
            yield new Expense_1.Expense({
                amountPaid: req.body.amount,
                school: (_e = req.user) === null || _e === void 0 ? void 0 : _e.school,
                schoolId: (_f = req.user) === null || _f === void 0 ? void 0 : _f.schoolId,
                term,
                year,
                createdBy: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id,
                name: ((_h = req.body) === null || _h === void 0 ? void 0 : _h.name) || "untitled expense",
            }).save();
            return res.status(201).json({
                msg: "expense added",
                status: 201,
            });
        });
    }
    editExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const expense = yield Expense_1.Expense.findById(id);
            if (!expense)
                throw new decorators_1.CustomError({}, "expense not found", 404);
            let v = expense.__v;
            Object.assign(expense, req.body);
            expense.__v = v;
            yield expense.save();
            return res.status(200).json({
                msg: "modified successfully",
                status: 200,
            });
        });
    }
    deleteExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const expense = yield Expense_1.Expense.findById(id);
            if (!expense)
                throw new decorators_1.CustomError({}, "expense not found", 404);
            yield expense.deleteOne();
            return res.status(200).json({
                msg: "modified successfully",
                status: 200,
            });
        });
    }
    getExpenseCountMonthly(req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const completedTransactions = yield Expense_1.Expense.find({
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
                months[(_c = total[i]) === null || _c === void 0 ? void 0 : _c.month] = ((_d = total[i]) === null || _d === void 0 ? void 0 : _d.amount) || 0;
                console.log((_e = total[i]) === null || _e === void 0 ? void 0 : _e.month);
            }
            res.status(200).json({
                status: 200,
                msg: "total expense amount fetched successfully",
                label: months,
            });
        });
    }
    getAllSchoolExpenses(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const { term, month, year } = req.query;
            const school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const totalExpenses = yield Expense_1.Expense.countDocuments({ school, schoolId });
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const totalPages = Math.ceil(totalExpenses / pageSize);
            const filter = {
                school: (_c = req.user) === null || _c === void 0 ? void 0 : _c.school,
                schoolId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.schoolId,
            };
            if (term) {
                const currentTerm = yield database_1.AcademicTerm.findOne({
                    school,
                    schoolId,
                    isCurrent: true,
                });
                filter.term = currentTerm === null || currentTerm === void 0 ? void 0 : currentTerm._id;
            }
            if (year) {
                const currentYear = yield database_1.AcademicYear.findOne({
                    school,
                    schoolId,
                    isCurrent: true,
                });
                filter.year = currentYear === null || currentYear === void 0 ? void 0 : currentYear._id;
            }
            if (month)
                filter.month = new Date().getMonth();
            let expenses = yield Expense_1.Expense.find(filter)
                .skip(skip)
                .limit(pageSize)
                .populate("createdBy")
                .select("name amountPaid createdAt.name school");
            return res.status(200).json({
                msg: "all students",
                status: 200,
                expenses,
                totalPages,
                page,
            });
        });
    }
}
exports.default = Object.freeze(new ExpenseController());
