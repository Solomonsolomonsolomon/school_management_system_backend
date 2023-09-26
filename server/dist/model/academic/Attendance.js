"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const attendanceSchema = new Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    attendanceDetails: [
        {
            date: {
                type: Date,
                required: true,
            },
            status: {
                type: String,
                enum: ["present", "absent", "late", "excused"],
                required: true,
            },
            class: {
                type: String,
                required: true,
            },
        },
    ],
    // Add any other fields you need here
});
const Attendance = mongoose_1.default.model("Attendance", attendanceSchema);
exports.default = Attendance;
