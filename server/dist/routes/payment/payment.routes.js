"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentRouter = (0, express_1.Router)();
const paystack_routes_1 = __importDefault(require("./paystack.routes"));
paymentRouter.use(paystack_routes_1.default);
exports.default = paymentRouter;
