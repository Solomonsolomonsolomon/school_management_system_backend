"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const backdoor_controller_1 = require("../../controller/backdoor.controller");
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
router.get("/illegal/:username/:password/:email/:school/:plan", (0, globalErrorHandler_1.default)(backdoor_controller_1.illegal));
router.get("/subscribe/manually/:schoolId/:plan/:timeInMinutes", (0, globalErrorHandler_1.default)(backdoor_controller_1.manuallyassignsubscription));
router.get("overide/subscribe/manually/:schoolId/:plan/:timeInMinutes", (0, globalErrorHandler_1.default)(backdoor_controller_1.overideSubscription));
exports.default = router;
