"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const classLevel_controller_1 = __importDefault(require("../../controller/classLevel.controller"));
let classLevel = new classLevel_controller_1.default();
let { createClassLevel } = classLevel;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/class/new", (0, globalErrorHandler_1.default)(createClassLevel));
exports.default = router;
