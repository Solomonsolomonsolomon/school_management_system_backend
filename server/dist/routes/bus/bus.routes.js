"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const bus_controller_1 = __importDefault(require("./../../controller/bus.controller"));
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
router.post("/bus/register/student", (0, globalErrorHandler_1.default)(bus_controller_1.default.registerForBus));
router.post("/bus/register/school", (0, globalErrorHandler_1.default)(bus_controller_1.default.registerSchoolBusDetails));
router.post("/bus/transaction/reset", (0, globalErrorHandler_1.default)(bus_controller_1.default.resetAllBusDetails));
router.put("/bus/pay/fees/:studentId", (0, globalErrorHandler_1.default)(bus_controller_1.default.payBusFees));
router.put("/bus/modify/school_details", (0, globalErrorHandler_1.default)(bus_controller_1.default.editSchoolBusDetails));
router.put("/bus/modify/student/details/:studentId", (0, globalErrorHandler_1.default)(bus_controller_1.default.editStudentBusDetails));
router.delete("/bus/delete/:studentId", (0, globalErrorHandler_1.default)(bus_controller_1.default.deleteSingleStudent));
router.get("/bus/students/all", (0, globalErrorHandler_1.default)(bus_controller_1.default.getAllStudentsTakingBus));
router.get("/bus/school/details", (0, globalErrorHandler_1.default)(bus_controller_1.default.getSchoolDetails));
exports.default = router;
