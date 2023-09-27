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
exports.genResult = exports.saveResult = exports.calcResult = void 0;
const database_1 = require("../model/database");
const lodash_1 = __importDefault(require("lodash"));
const decorators_1 = require("../middleware/decorators");
function calcResult(groupedData) {
    return __awaiter(this, void 0, void 0, function* () {
        let bulkPushOperations = [];
        for (const className in groupedData) {
            const students = groupedData[className];
            for (const student of students) {
                let validGrades = 0;
                let totalMarks = 0;
                for (let i of student.grades) {
                    if (i.CA1 !== null ||
                        i.CA2 !== null ||
                        i.CA3 !== null ||
                        i.examScore !== null)
                        validGrades++;
                }
                totalMarks = validGrades ? lodash_1.default.sumBy(student.grades, "total") : 0;
                const averageMarks = validGrades ? totalMarks / validGrades : -1;
                let overallGrade = "";
                if (averageMarks === -1) {
                    overallGrade = "N/A";
                }
                if (averageMarks >= 75) {
                    overallGrade = "A";
                }
                else if (averageMarks >= 60) {
                    overallGrade = "B";
                }
                else if (averageMarks >= 50) {
                    overallGrade = "C";
                }
                else if (averageMarks >= 40) {
                    overallGrade = "D";
                }
                else {
                    overallGrade = "F";
                }
                student.totalMarks = totalMarks;
                student.averageMarks = averageMarks;
                student.overallGrade = overallGrade;
            }
            students.sort((a, b) => b.totalMarks - a.totalMarks);
            for (let i = 0; i < students.length; i++) {
                students[i].position = i + 1;
                let resultMetaData = {
                    name: students[i].studentId.name,
                    studentId: students[i].studentId.studentId,
                    id: students[i].studentId._id,
                    totalScore: students[i].totalMarks,
                    year: students[i].year,
                    school: students[i].school,
                    term: students[i].term,
                    position: students[i].position,
                    class: `${students[i].studentId.currentClassLevel}${students[i].studentId.currentClassArm}`,
                    overallGrade: students[i].overallGrade,
                    average: students[i].averageMarks,
                    grades: students[i].grades,
                    status: students[i].overallGrade == "F" ? "failed" : "passed",
                };
                bulkPushOperations.push({
                    updateOne: {
                        filter: {
                            id: students[i].studentId._id,
                            term: students[i].term,
                            year: students[i].year,
                        },
                        update: { $set: resultMetaData },
                        upsert: true,
                    },
                });
            }
        }
        yield database_1.Result.bulkWrite(bulkPushOperations);
        return groupedData;
    });
}
exports.calcResult = calcResult;
function saveResult(student, term, year) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.Result.findOne({ student, term, year }).then((resultInstance) => {
                if (!resultInstance)
                    throw new Error("hi");
                //im trying to replace result details if it already exists and i want to use bulk write so that i will use only one db call please help me
            });
        }
        catch (error) {
            throw error;
        }
    });
}
exports.saveResult = saveResult;
function genResult(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let term = yield database_1.AcademicTerm.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            let year = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            if (!year || !term)
                throw new decorators_1.CustomError({}, "set current term and current year", 400);
            let gradesPipeline = yield database_1.Grades.aggregate([
                {
                    $lookup: {
                        from: "students",
                        localField: "studentId",
                        foreignField: "_id",
                        as: "studentId",
                    },
                },
                {
                    $unwind: "$studentId",
                },
                {
                    $lookup: {
                        from: "subjects",
                        localField: "grades.subjectId",
                        foreignField: "_id",
                        as: "subjectId",
                    },
                },
                {
                    $match: {
                        $and: [
                            { school },
                            { schoolId },
                            { year: year._id },
                            { term: term._id },
                        ],
                    },
                },
            ]).exec();
            let groupedData = lodash_1.default.groupBy(gradesPipeline, (student) => {
                return `${student.studentId.currentClassLevel}${student.studentId.currentClassArm}`;
            });
            let results = yield calcResult(groupedData);
            //  await pushResultsToStudents(results, year, term);
            res.status(201).json({
                status: 201,
                msg: "results generated and pushed successfully",
                results,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                error,
                err: error.message,
            });
        }
    });
}
exports.genResult = genResult;
// async function pushResultsToStudents(results: any, year: any, term: any) {
//   const result = Object.values(results);
//   const bulkOperations = [];
//   const unsorted: any[] = result.flat();
//   for (const i of unsorted) {
//     console.log("processing result for student", i.studentId.name);
// bulkOperations.push({
//   updateOne: {
//     filter: {
//       school: i.school,
//       schoolId: i.schoolId,
//       _id: i.studentId._id,
//     },
//     update: {
//       $addToSet: { examResults: i._id }, // Add the new result to the examResults array
//     },
//   },
// });
//}
// try {
//   const res = await Student.bulkWrite(bulkOperations);
//   console.log(res, "hgf");
// } catch (err) {
//   console.error("Error updating examResults:", err);
// }
//}
