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
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewClassResults = exports.getStudentsTaught = exports.managedStudents = void 0;
const database_1 = require("../model/database");
const decorators_1 = require("../middleware/decorators");
function managedStudents(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = req.params;
        let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
        let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
        let teacher = yield database_1.Teacher.findOne({ _id }).select("formTeacher");
        if (!teacher)
            throw new decorators_1.CustomError({}, "teacher not found.either deleted or doesnt exist", 404);
        let formTeacher = teacher.formTeacher;
        if (!formTeacher)
            throw new decorators_1.CustomError({}, "YOU are not a Form Teacher..if you are,please visit admin", 404);
        let formStudents = yield database_1.Student.find({
            className: formTeacher,
            school,
            schoolId,
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
        try {
            const { id } = req.params;
            const school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            const schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const currentTerm = yield database_1.AcademicTerm.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            const currentYear = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            // Find the teacher by ID
            const teacher = yield database_1.Teacher.findOne({ school, _id: id }).populate("subjects");
            if (!teacher) {
                throw new decorators_1.CustomError({}, "Teacher doesn't exist", 404);
            }
            const subjects = teacher.subjects;
            // Find students taught by the teacher
            const studentsTaught = yield database_1.Student.find({
                school,
                schoolId,
                subjects: { $in: subjects },
            })
                .select("name _id formTeacher email age className subjects")
                .populate("subjects");
            if (!studentsTaught.length) {
                throw new decorators_1.CustomError({}, "No students enrolled in subjects taught by you", 404);
            }
            const studentsWithGrades = yield Promise.all(studentsTaught.map((student) => __awaiter(this, void 0, void 0, function* () {
                // Find the grades for each subject and student
                const grades = yield database_1.Grades.findOne({
                    studentId: student._id,
                    year: currentYear,
                    term: currentTerm,
                    school,
                    className: student.className,
                    schoolId,
                });
                return Object.assign(Object.assign({}, student.toObject()), { grades: grades ? grades.grades : [] });
            })));
            // Format the response as needed
            const formattedResponse = {};
            subjects.forEach((subject) => {
                const studentsForSubject = studentsWithGrades.filter((student) => student.subjects.some((subj) => subj.name === subject.name));
                formattedResponse[subject.name] = studentsForSubject.map((student) => ({
                    name: student.name,
                    studentId: student._id,
                    subjectId: subject._id,
                    CA1: getGradeForSubject(student, subject, "CA1"),
                    CA2: getGradeForSubject(student, subject, "CA2"),
                    CA3: getGradeForSubject(student, subject, "CA3"),
                    examScore: getGradeForSubject(student, subject, "examScore"),
                }));
            });
            res.status(200).json({
                msg: "Form Students",
                studentsTaught: formattedResponse,
            });
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                msg: "No students taught by you",
                error: error.message,
            });
        }
    });
}
exports.getStudentsTaught = getStudentsTaught;
function getGradeForSubject(student, subject, exam) {
    const subjectGrades = student.grades.find((grade) => grade.subjectId.equals(subject._id));
    return subjectGrades ? subjectGrades[exam] : 0;
}
function previewClassResults(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        let teacher = yield database_1.Teacher.findById(id);
        const school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
        let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
        if (!teacher || !(teacher === null || teacher === void 0 ? void 0 : teacher.formTeacher))
            throw new decorators_1.CustomError({}, "you arent authorized to view this resource", 401);
        let results = yield database_1.Result.find({
            class: teacher.formTeacher,
            school,
            schoolId,
        });
        console.log(results);
    });
}
exports.previewClassResults = previewClassResults;
