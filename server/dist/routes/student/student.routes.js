"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const student_controller_1 = __importDefault(require("../../controller/student.controller"));
router.get("/student/:id/results/all", (0, globalErrorHandler_1.default)(student_controller_1.default.viewResultsYears));
router.get("/student/:id/result/:year/:term", (0, globalErrorHandler_1.default)(student_controller_1.default.getSingleResult));
exports.default = router;
