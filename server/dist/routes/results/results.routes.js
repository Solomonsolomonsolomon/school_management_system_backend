"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const results_controller_1 = require("../../controller/results.controller");
router.post("/results/generate", results_controller_1.genResult);
exports.default = router;
