"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const subscription_controller_1 = __importDefault(require("../../controller/subscription.controller"));
router.get("/subscription/details", (0, globalErrorHandler_1.default)(subscription_controller_1.default.getSubscriptionDetails));
exports.default = router;
