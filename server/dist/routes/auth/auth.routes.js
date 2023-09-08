"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controller/auth.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/auth/signin", auth_controller_1.signIn);
router.get("/auth/logout/:role/:email", auth_controller_1.signOut);
exports.default = router;
