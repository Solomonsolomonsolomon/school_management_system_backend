"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const attendance_controller_1 = require("../../controller/attendance.controller");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
router.get("/attendance/get/:id/:className", (0, globalErrorHandler_1.default)(attendance_controller_1.attendance.getAttendanceDetails));
router.post("/attendance/new/:id/:className", (0, globalErrorHandler_1.default)(attendance_controller_1.attendance.setAttendanceDetails));
router.put("/attendance/edit/:id/:className", (0, globalErrorHandler_1.default)(attendance_controller_1.attendance.EditAttendanceDetails));
router.get("/attendance/percentage/:id", (0, globalErrorHandler_1.default)(attendance_controller_1.attendance.getAttendancePercentage));
exports.default = router;
