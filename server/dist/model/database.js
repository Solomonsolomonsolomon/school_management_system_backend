"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.School = exports.ClassLevel = exports.AcademicYear = exports.AcademicTerm = exports.Subject = exports.Result = exports.Grades = exports.Student = exports.Admin = exports.Teacher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        let connectionString = typeof process.env.LOCAL_MONGO_URI == "string"
            ? process.env.LOCAL_MONGO_URI
            : "";
        mongoose_1.default
            .connect(connectionString)
            .then(() => {
            console.log(`database Successfully connected`);
        })
            .catch((err) => {
            console.log(`ERR!!! database not connected~${err.message}`);
        });
    });
}
const Teacher_1 = require("./staff/Teacher");
Object.defineProperty(exports, "Teacher", { enumerable: true, get: function () { return Teacher_1.Teacher; } });
const Admin_1 = require("./staff/Admin");
Object.defineProperty(exports, "Admin", { enumerable: true, get: function () { return Admin_1.Admin; } });
const Student_1 = require("./academic/Student");
Object.defineProperty(exports, "Student", { enumerable: true, get: function () { return Student_1.Student; } });
const Grades_1 = require("./academic/Grades");
Object.defineProperty(exports, "Grades", { enumerable: true, get: function () { return Grades_1.Grades; } });
const Result_1 = require("./academic/Result");
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return Result_1.Result; } });
const Subject_1 = require("./academic/Subject");
Object.defineProperty(exports, "Subject", { enumerable: true, get: function () { return Subject_1.Subject; } });
const AcademicTerm_1 = require("./academic/AcademicTerm");
Object.defineProperty(exports, "AcademicTerm", { enumerable: true, get: function () { return AcademicTerm_1.AcademicTerm; } });
const AcademicYear_1 = require("./academic/AcademicYear");
Object.defineProperty(exports, "AcademicYear", { enumerable: true, get: function () { return AcademicYear_1.AcademicYear; } });
const ClassLevel_1 = require("./academic/ClassLevel");
Object.defineProperty(exports, "ClassLevel", { enumerable: true, get: function () { return ClassLevel_1.ClassLevel; } });
const School_1 = require("./others/School");
Object.defineProperty(exports, "School", { enumerable: true, get: function () { return School_1.School; } });
const Transacton_1 = require("./others/Transacton");
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return Transacton_1.Transaction; } });
exports.default = connectDB;
