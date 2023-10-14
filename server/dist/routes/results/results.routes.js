"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const results_controller_1 = require("../../controller/results.controller");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
router.get("/results/generate", results_controller_1.genResult);
router.get("/result/teacher/generate/:id", results_controller_1.teacherGenerateResult);
router.delete("/result/delete/:id", (0, globalErrorHandler_1.default)(results_controller_1.DeleteResult));
exports.default = router;
