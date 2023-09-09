"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// const subjectSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     teacher: {
//       type: Schema.Types.ObjectId,
//       ref: "Teacher",
//     },
//     academicTerm: {
//       type: Schema.Types.ObjectId,
//       ref: "AcademicTerm",
//       required: true,
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },
//     duration: {
//       type: String,
//       required: true,
//       default: "3 months",
//     },
//   },
//   { timestamps: true }
// // );
// const subjectSchema = new Schema({
//   name: {
//     type: String,
//   },
//   // subjectName: {
//   //   type: String,
//   //
//   //
//   // },
//   subject: {
//     type: String,
//   },
//   teacherId: {
//     type: Types.ObjectId,
//     ref: "Teacher",
//   },
//   academicYear: {
//     type: Schema.Types.ObjectId,
//     ref: "AcademicYear",
//   },
//   // academicYear: {
//   //   type: String,
//   //   default: () => {
//   //     let date = new Date();
//   //     //september begins new academic year
//   //     return date.getMonth() < 8
//   //       ? `${date.getFullYear() - 1}/${date.getFullYear()}`
//   //       : `${date.getFullYear()}/${date.getFullYear() + 1}`;
//   //   },
//   // },
//   className: {
//     type: String,
//     required: true,
//   },
// });
const SubjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    academicYear: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicYear",
    },
    className: {
        type: String,
    },
    subject: {
        type: String,
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
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Teacher",
    },
});
SubjectSchema.pre("save", function () {
    this.name = `${this.className.toUpperCase()}_${this.subject.toUpperCase()}`;
});
const Subject = mongoose_1.default.model("Subject", SubjectSchema);
exports.Subject = Subject;
Subject.syncIndexes();
