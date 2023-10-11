"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_controller_1 = __importDefault(require("../../controller/transactions.controller"));
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const transaction = new transactions_controller_1.default();
const transactionRouter = (0, express_1.Router)();
transactionRouter.post("/transaction/new", (0, globalErrorHandler_1.default)(transaction.createTransaction));
transactionRouter.get("/transaction/get/all", (0, globalErrorHandler_1.default)(transaction.getAllTransactions));
transactionRouter.get("/transaction/get/student/:_id", (0, globalErrorHandler_1.default)(transaction.getTransactionsByStudent));
transactionRouter.get("/transaction/get/total", (0, globalErrorHandler_1.default)(transaction.getTotalAmountFromCompletedTransactions));
transactionRouter.get("transaction/complete", (0, globalErrorHandler_1.default)(transaction.getAllCompletedTransactions));
transactionRouter.get("/transaction/monthly", (0, globalErrorHandler_1.default)(transaction.getTotalAmountAndMonthPaid));
transactionRouter.get("/transaction/ratio/earnings/expense", transaction.getRatioOfEarningsToExpense);
exports.default = transactionRouter;
