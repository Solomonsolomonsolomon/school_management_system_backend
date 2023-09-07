"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const grades_controller_1 = require("./../../controller/grades.controller");
router.post("/grades/add/:studentId", grades_controller_1.addGrades);
exports.default = router;
