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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { year, term, subjectId } = req.body;
            const { studentId } = req.params;
            const studentID = new mongoose_1.Types.ObjectId(studentId);
            const subjectID = new mongoose_1.Types.ObjectId(subjectId);
            let currentTerm = !!(yield database_1.AcademicTerm.countDocuments({ name: term }));
            let currentYear = !!(yield database_1.AcademicYear.countDocuments({ name: year }));
            let isValidStudentId = !!(yield database_1.Student.countDocuments({ _id: studentID }));
            let isValidSubjectId = !!(yield database_1.Subject.countDocuments({ _id: subjectID }));
            if (!currentYear)
                throw new Error(" year entered not valid");
            if (!currentTerm)
                throw new Error("term entered not valid");
            if (!isValidStudentId)
                throw new Error("enter valid studentId");
            if (!isValidSubjectId)
                throw new Error("enter valid subjectId");
            let gradesObjectExists = yield database_1.Grades.findOne({ studentId, year, term });
            //if grade object doesnt exist
            if (!gradesObjectExists) {
                //create new grade
                const newGradesObject = new database_1.Grades({
                    studentId: studentID,
                    year,
                    term,
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
