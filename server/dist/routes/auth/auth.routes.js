"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controller/auth.controller");
const express_1 = require("express");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const router = (0, express_1.Router)();
router.post("/auth/signin", auth_controller_1.signIn);
router.get("/auth/logout/:role/:email", auth_controller_1.signOut);
router.post("/auth/password/change", (0, globalErrorHandler_1.default)(auth_controller_1.changePassword));
exports.default = router;
