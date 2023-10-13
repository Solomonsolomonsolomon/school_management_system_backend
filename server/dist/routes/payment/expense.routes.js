"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const expense_controller_1 = __importDefault(require("./../../controller/expense.controller"));
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
router.post("/expense/new", (0, globalErrorHandler_1.default)(expense_controller_1.default.addExpense));
router.get("/expense/monthly", (0, globalErrorHandler_1.default)(expense_controller_1.default.getExpenseCountMonthly));
router.get("/expense/school", (0, globalErrorHandler_1.default)(expense_controller_1.default.getAllSchoolExpenses));
exports.default = router;
