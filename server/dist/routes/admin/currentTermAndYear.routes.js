"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const academicterm_controller_1 = __importDefault(require("../../controller/academicterm.controller"));
const academicyear_controller_1 = __importDefault(require("../../controller/academicyear.controller"));
const express_1 = require("express");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const router = (0, express_1.Router)();
let term = new academicterm_controller_1.default();
let year = new academicyear_controller_1.default();
router.get("/term/get/current", (0, globalErrorHandler_1.default)(term.getCurrentTerm));
router.get("/year/get/current", (0, globalErrorHandler_1.default)(year.getCurrentYear));
exports.default = router;
