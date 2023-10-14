"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionSchema = new mongoose_1.Schema({
    school: {
        type: String,
        required: true,
    },
    schoolId: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Number,
        required: true,
    },
});
let Subscription = (0, mongoose_1.model)("Subscription", subscriptionSchema);
exports.Subscription = Subscription;
