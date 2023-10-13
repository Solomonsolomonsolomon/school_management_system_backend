"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const grades_controller_1 = __importDefault(require("./../../controller/grades.controller"));
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
router.post("/grades/add/:studentId", (0, globalErrorHandler_1.default)(grades_controller_1.default.addGrades));
router.delete("/grades/delete/:id/:className", (0, globalErrorHandler_1.default)(grades_controller_1.default.deleteGrades));
exports.default = router;
