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
exports.addGrades = void 0;
const database_1 = require("../model/database");
const mongoose_1 = require("mongoose");
function addGrades(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { subjectId } = req.body;
            const { CA1, CA2, CA3, examScore } = req.body;
            const school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            const schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const { studentId } = req.params;
            const studentID = new mongoose_1.Types.ObjectId(studentId);
            const subjectID = new mongoose_1.Types.ObjectId(subjectId);
            const className = yield database_1.Student.findById(studentID);
            let currentTerm = yield database_1.AcademicTerm.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            let currentYear = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            let isValidStudentId = !!(yield database_1.Student.countDocuments({ _id: studentID }));
            let isValidSubjectId = !!(yield database_1.Subject.countDocuments({ _id: subjectID }));
            if (!currentYear)
                throw new Error(" no current year set.please visit admin to set");
            if (!currentTerm)
                throw new Error("no current term found.please contact admin to set");
            if (!isValidStudentId)
                throw new Error("enter valid studentId");
            if (!isValidSubjectId)
                throw new Error("enter valid subjectId");
            let gradesObjectExists = yield database_1.Grades.findOne({
                studentId,
                year: currentYear,
                term: currentTerm,
                className: className === null || className === void 0 ? void 0 : className.className,
                school,
                schoolId,
            });
            //if grade object doesnt exist
            if (!gradesObjectExists) {
                //create new grade
                const newGradesObject = new database_1.Grades({
                    studentId: studentID,
                    className: className === null || className === void 0 ? void 0 : className.className,
                    year: currentYear,
                    term: currentTerm,
                    school,
                    schoolId,
                    grades: [Object.assign(Object.assign({}, req.body), { studentId: studentID, subjectId: subjectID })],
                });
                const grade = yield newGradesObject.save();
                res.status(201).json({
                    status: 201,
                    msg: "Added grade successfully",
                    grade,
                });
            }
            else {
                //if grades object exists
                let subjectIndex = yield gradesObjectExists.grades.findIndex((grades) => {
                    return grades.subjectId == subjectId;
                });
                //if subject already added for grade,edit
                if (subjectIndex !== -1) {
                    Object.assign(gradesObjectExists.grades[subjectIndex], Object.assign(Object.assign({}, req.body), { subjectId: subjectID, studentId: studentID }));
                    return yield gradesObjectExists.save().then((e) => {
                        res.status(201).json({
                            status: 201,
                            msg: "Added grade successfully",
                            grade: gradesObjectExists,
                        });
                    });
                }
                //else push new subject
                gradesObjectExists.grades.push(Object.assign(Object.assign({}, req.body), { studentId: studentID, subjectId: subjectID }));
                yield gradesObjectExists.save();
                res.status(201).json({
                    status: 201,
                    msg: "Added grade successfully",
                    grade: gradesObjectExists,
                });
            }
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: "Failed to add grade",
                error: error.message,
            });
        }
    });
}
exports.addGrades = addGrades;
