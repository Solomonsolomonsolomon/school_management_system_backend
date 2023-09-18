"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../../controller/payment.controller");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const paystackRouter = (0, express_1.Router)();
paystackRouter.post("/paystack/pay", payment_controller_1.initializeTransaction);
paystackRouter.post("/paystack/verify", payment_controller_1.verifyPayment);
paystackRouter.post("/paystack/create/subaccount", payment_controller_1.subAccount);
paystackRouter.get("/paystack/get/bank", payment_controller_1.getBank);
paystackRouter.post("/paystack/webhook/url", (0, globalErrorHandler_1.default)(payment_controller_1.payWebHook));
exports.default = paystackRouter;
