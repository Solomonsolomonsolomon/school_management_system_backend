"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grades = void 0;
const mongoose_1 = __importStar(require("mongoose"));
let gradesSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    },
    year: {
        type: String,
    },
    term: {
        type: String,
    },
    school: {
        type: String,
    },
    plan: {
        type: String,
        enum: ["basic", "standard", "advanced"],
    },
    grades: [
        {
            CA1: Number,
            CA2: Number,
            CA3: Number,
            examScore: Number,
            subjectId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Subject",
            },
            total: {
                type: Number,
                default: 0,
            },
            letterGrade: {
                type: String,
            },
        },
    ],
});
gradesSchema.pre("save", function (next) {
    let grades = this.grades;
    function calculateTotal(scores, total = 0) {
        for (let i in scores) {
            typeof scores[i] == "number" ? (total += scores[i]) : (total += 0);
        }
        return total;
    }
    for (let grade of grades) {
        let total = calculateTotal([
            grade.CA1,
            grade.CA2,
            grade.CA3,
            grade.examScore,
        ]);
        grade.total = total;
        grade.total >= 75
            ? (grade.letterGrade = "A")
            : grade.total >= 60 && grade.total < 75
                ? (grade.letterGrade = "B")
                : grade.total >= 50 && grade.total < 60
                    ? (grade.letterGrade = "C")
                    : grade.total > 40 && grade.total <= 49
                        ? (grade.letterGrade = "D")
                        : (grade.letterGrade = "F");
    }
    next();
});
let Grades = (0, mongoose_1.model)("Grades", gradesSchema);
exports.Grades = Grades;
Grades.syncIndexes();
