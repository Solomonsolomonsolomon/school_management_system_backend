"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const results_controller_1 = require("../../controller/results.controller");
router.get("/results/generate", results_controller_1.genResult);
router.get("/result/teacher/generate/:id", results_controller_1.teacherGenerateResult);
exports.default = router;
