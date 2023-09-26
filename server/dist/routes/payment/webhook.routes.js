"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_controller_1 = require("../../controller/payment.controller");
const express_1 = require("express");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const router = (0, express_1.Router)();
router.post("/paystack/webhook", (0, globalErrorHandler_1.default)(payment_controller_1.payWebHook));
exports.default = router;
