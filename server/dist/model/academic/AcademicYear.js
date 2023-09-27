"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYear = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const academicYearSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    fromYear: {
        type: String,
        required: true,
    },
    toYear: {
        type: String,
        required: true,
    },
    school: {
        type: String,
    },
    schoolId: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        enum: ["basic", "standard", "advanced"],
    },
    isCurrent: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
    },
    updatedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
    },
    createdByBot: {
        type: Boolean,
        default: false,
        required: true,
    },
    students: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    teachers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    //Finance
    //Librarian
    //......
}, {
    timestamps: true,
});
//model
const AcademicYear = mongoose_1.default.model("AcademicYear", academicYearSchema);
exports.AcademicYear = AcademicYear;
AcademicYear.syncIndexes();
