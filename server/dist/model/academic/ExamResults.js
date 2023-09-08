"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
//exam result schema
const examResultSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    passMark: {
        type: Number,
        required: true,
        default: 50,
    },
    //failed/Passed
    status: {
        type: String,
        required: true,
        enum: ["failed", "passed"],
        default: "failed",
    },
    //Excellent/Good/Poor
    remarks: {
        type: String,
        required: true,
        enum: ["Excellent", "Good", "Poor"],
        default: "Poor",
    },
    position: {
        type: Number,
        required: true,
    },
    subject: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Subject",
    },
    classLevel: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ClassLevel",
    },
    academicTerm: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true,
    },
    academicYear: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const ExamResult = mongoose_1.default.model("ExamResult", examResultSchema);
module.exports = ExamResult;
