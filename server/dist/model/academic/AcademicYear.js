"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYear = void 0;
const mongoose = require("mongoose");
const academicYearSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    createdByBot: {
        type: Boolean,
        default: false,
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
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
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);
exports.AcademicYear = AcademicYear;
AcademicYear.syncIndexes();