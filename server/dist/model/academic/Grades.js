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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grades = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const database_1 = require("../database");
const decorators_1 = require("../../middleware/decorators");
let gradesSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    },
    className: {
        type: String,
    },
    year: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicYear",
    },
    term: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicTerm",
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
    return __awaiter(this, void 0, void 0, function* () {
        let grades = this.grades;
        function calculateTotal(scores, total = 0) {
            for (let i in scores) {
                typeof scores[i] == "number" ? (total += scores[i]) : (total += 0);
            }
            return total;
        }
        let schoolToCompare = yield database_1.School.findOne({
            school: this.school,
            schoolId: this.schoolId,
        });
        if (!schoolToCompare)
            throw new decorators_1.CustomError({}, "cannot add grades until school completes registration", 400);
        for (let grade of grades) {
            let total = calculateTotal([
                grade.CA1,
                grade.CA2,
                grade.CA3,
                grade.examScore,
            ]);
            grade.total = total;
            console.log(grade.total);
            let A = schoolToCompare.gradePoints.A || 75;
            let B = schoolToCompare.gradePoints.B || 60;
            let C = schoolToCompare.gradePoints.C || 50;
            let D = schoolToCompare.gradePoints.D || 40;
            if (grade.total >= A) {
                grade.letterGrade = "A";
            }
            else if (grade.total >= B) {
                grade.letterGrade = "B";
            }
            else if (grade.total >= C) {
                grade.letterGrade = "C";
            }
            else if (grade.total >= D) {
                grade.letterGrade = "D";
            }
            else {
                grade.letterGrade = "F";
            }
        }
        next();
    });
});
let Grades = (0, mongoose_1.model)("Grades", gradesSchema);
exports.Grades = Grades;
Grades.syncIndexes();
