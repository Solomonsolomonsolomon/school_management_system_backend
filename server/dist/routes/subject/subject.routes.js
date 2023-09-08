"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const subject_controller_1 = __importDefault(require("../../controller/subject.controller"));
let subject = new subject_controller_1.default();
router.get("/subject/get/all", (0, globalErrorHandler_1.default)(subject.getAllSubjects));
router.post("/subject/add", (0, globalErrorHandler_1.default)(subject.addSubjects));
router.post("/subject/edit/:id", (0, globalErrorHandler_1.default)(subject.editSubjects));
router.delete("/subject/delete/:id", (0, globalErrorHandler_1.default)(subject.deleteSubjects));
router.get("/subject/get/all/json", (0, globalErrorHandler_1.default)(subject.getAllSubjectsAsJson));
exports.default = router;
