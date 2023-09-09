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
exports.getStudentsTaught = exports.managedStudents = void 0;
const database_1 = require("../model/database");
const globalErrorHandler_1 = __importDefault(require("../middleware/globalErrorHandler"));
const decorators_1 = require("../middleware/decorators");
console.log(globalErrorHandler_1.default);
function managedStudents(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = req.params;
        let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
        let teacher = yield database_1.Teacher.findOne({ _id }).select("formTeacher");
        if (!teacher)
            throw new decorators_1.CustomError({}, "teacher not found.either deleted or doesnt exist", 404);
        let formTeacher = teacher.formTeacher;
        if (!formTeacher)
            throw new decorators_1.CustomError({}, "YOU are not a Form Teacher..if you are,please visit admin", 404);
        let formStudents = yield database_1.Student.find({
            className: formTeacher,
            school,
        }).select("name _id formTeacher school email age className studentId gender parent ");
        if (!formStudents.length)
            throw new decorators_1.CustomError({}, "NO students yet..When registered they will be assigned to you", 404);
        res.status(200).json({
            status: 200,
            msg: "form students",
            formStudents,
            formTeacher: teacher === null || teacher === void 0 ? void 0 : teacher.formTeacher,
        });
    });
}
exports.managedStudents = managedStudents;
function getStudentsTaught(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
        let teacher = yield database_1.Teacher.findOne({ school: (_b = req.user) === null || _b === void 0 ? void 0 : _b.school, _id: id });
        if (!teacher)
            throw new decorators_1.CustomError({}, "teacher doesnt exist", 404);
        let subjects = teacher.subjects;
        let studentsTaught = yield database_1.Student.find({
            school,
            subjects: { $in: subjects }, // Filter students by subjects
        })
            .select("name _id formTeacher email age className subjects")
            .populate("subjects");
        console.log(studentsTaught);
        if (!studentsTaught.length)
            throw new decorators_1.CustomError({}, "No students enrolled in subjects taught by you", 404);
        const studentsBySubject = {};
        studentsTaught.forEach((student) => {
            var _a;
            (_a = student.subjects) === null || _a === void 0 ? void 0 : _a.forEach((subject) => {
                const subjectName = subject.name;
                if (!studentsBySubject[subjectName]) {
                    studentsBySubject[subjectName] = [];
                }
                studentsBySubject[subjectName].push(student);
            });
        });
        console.log(studentsBySubject);
        // Group students by class name
        res.status(200).json({
            msg: "Form Students",
            studentsTaught: studentsBySubject,
        });
    });
}
exports.getStudentsTaught = getStudentsTaught;
