"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherRouter = (0, express_1.Router)();
const teacher_controller_1 = require("../../controller/teacher.controller");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
teacherRouter.get("/teacher/:_id/get/students", (0, globalErrorHandler_1.default)(teacher_controller_1.managedStudents));
teacherRouter.get("/teacher/:id/get/students/taught", (0, globalErrorHandler_1.default)(teacher_controller_1.getStudentsTaught));
exports.default = teacherRouter;
