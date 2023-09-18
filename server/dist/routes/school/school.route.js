"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const school_controller_1 = __importDefault(require("../../controller/school.controller"));
const router = (0, express_1.Router)();
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
let school = new school_controller_1.default();
router.get("/school/theme/current", (0, globalErrorHandler_1.default)(school.getCurrentTheme));
router.get("/school/theme/default", (0, globalErrorHandler_1.default)(school.getDefaultTheme));
router.post("/school/theme/set", (0, globalErrorHandler_1.default)(school.changeTheme));
router.get("/school/logo/insert", (0, globalErrorHandler_1.default)(school.insertLogo));
router.get("/school/logo/current", (0, globalErrorHandler_1.default)(school.getLogo));
router.get("/school/logo/theme/get", (0, globalErrorHandler_1.default)(school.logoAndThemes));
exports.default = router;
