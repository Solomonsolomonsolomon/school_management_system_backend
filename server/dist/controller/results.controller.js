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
exports.DeleteResult = exports.autoPromote = exports.teacherGenerateResult = exports.genResult = exports.calcResultAndCummulativeAndAutoPromote = exports.calcResultAndCummulative = exports.calcResult = void 0;
const database_1 = require("../model/database");
const lodash_1 = __importDefault(require("lodash"));
const decorators_1 = require("../middleware/decorators");
function calcResult(groupedData, school, schoolId) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let _school = yield database_1.School.findOne({ school, schoolId });
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
                if (averageMarks >= (((_a = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _a === void 0 ? void 0 : _a.A) || 75)) {
                    overallGrade = "A";
                }
                else if (averageMarks >= (((_b = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _b === void 0 ? void 0 : _b.B) || 60)) {
                    overallGrade = "B";
                }
                else if (averageMarks >= (((_c = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _c === void 0 ? void 0 : _c.C) || 50)) {
                    overallGrade = "C";
                }
                else if (averageMarks >= (((_d = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _d === void 0 ? void 0 : _d.D) || 40)) {
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
                    schoolId: students[i].schoolId,
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
function calcResultAndCummulative(groupedData, school, year, schoolId, teacher) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let bulkPushOperations = [];
        let _school = yield database_1.School.findOne({ school, schoolId });
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
                if (averageMarks >= (((_a = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _a === void 0 ? void 0 : _a.A) || 75)) {
                    overallGrade = "A";
                }
                else if (averageMarks >= (((_b = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _b === void 0 ? void 0 : _b.B) || 60)) {
                    overallGrade = "B";
                }
                else if (averageMarks >= (((_c = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _c === void 0 ? void 0 : _c.C) || 50)) {
                    overallGrade = "C";
                }
                else if (averageMarks >= (((_d = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _d === void 0 ? void 0 : _d.D) || 40)) {
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
                    schoolId: students[i].schoolId,
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
        let allTerms = yield database_1.Result.find({
            year,
            schoolId: schoolId,
            class: (teacher === null || teacher === void 0 ? void 0 : teacher.formTeacher) || "not a form teacher",
        });
        let cummulativeScore = allTerms.reduce((p, c) => {
            const { totalScore, studentId, name, average } = c;
            const i = p.tracker.get(studentId);
            if (totalScore) {
                if (i) {
                    p.student[i].totalScore += totalScore;
                }
                else {
                    p.tracker.set(studentId, p.student.length);
                    p.student.push({ studentId, totalScore, name, average });
                }
            }
            else {
                return p;
            }
            return p;
        }, {
            student: [{ totalScore: 0, studentId: "", name: "", average: 0 }],
            tracker: new Map(),
        }).student;
        cummulativeScore.shift();
        return { groupedData, cummulativeScore };
    });
}
exports.calcResultAndCummulative = calcResultAndCummulative;
function calcResultAndCummulativeAndAutoPromote(groupedData, school, year, schoolId, teacher, promotionClasses) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let bulkPushOperations = [];
        let studentBulkOperations = [];
        let _school = yield database_1.School.findOne({ school, schoolId });
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
                if (averageMarks >= (((_a = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _a === void 0 ? void 0 : _a.A) || 75)) {
                    overallGrade = "A";
                }
                else if (averageMarks >= (((_b = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _b === void 0 ? void 0 : _b.B) || 60)) {
                    overallGrade = "B";
                }
                else if (averageMarks >= (((_c = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _c === void 0 ? void 0 : _c.C) || 50)) {
                    overallGrade = "C";
                }
                else if (averageMarks >= (((_d = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _d === void 0 ? void 0 : _d.D) || 40)) {
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
                    schoolId: students[i].schoolId,
                    term: students[i].term,
                    position: students[i].position,
                    class: students[i].className,
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
        let allTerms = yield database_1.Result.find({
            year,
            schoolId: schoolId,
            class: (teacher === null || teacher === void 0 ? void 0 : teacher.formTeacher) || "not a form teacher",
        });
        const sampleData = [
            { totalScore: 0.85, name: "Alice", studentId: "N1", totalTerms: 0 },
            { totalScore: 0.92, name: "Alice", studentId: "N1", totalTerms: 0 },
            { totalScore: 0.78, name: "Alice", studentId: "N1", totalTerms: 0 },
            { totalScore: 0.9, name: "Bob", studentId: "N2", totalTerms: 0 },
            { totalScore: 0.88, name: "Bob", studentId: "N2", totalTerms: 0 },
            { totalScore: 0.91, name: "Charlie", studentId: "N3", totalTerms: 0 },
            { totalScore: 0.89, name: "David", studentId: "N4", totalTerms: 0 },
            { totalScore: 0.76, name: "Eve", studentId: "N5", totalTerms: 0 },
            { totalScore: 0.82, name: "Frank", studentId: "N6", totalTerms: 0 },
            { totalScore: 0.95, name: "Grace", studentId: "N7", totalTerms: 0 },
            { totalScore: 0.8, name: "Helen", studentId: "N8", totalTerms: 0 },
            { totalScore: 0.87, name: "Ivy", studentId: "N9", totalTerms: 0 },
            { totalScore: 0.93, name: "Jack", studentId: "N10", totalTerms: 0 },
            { totalScore: 0.94, name: "Jack", studentId: "N10", totalTerms: 0 },
            { totalScore: 0.89, name: "Jack", studentId: "N10", totalTerms: 0 },
            { totalScore: 0.9, name: "Bob", studentId: "N2", totalTerms: 0 },
            { totalScore: 0.87, name: "Charlie", studentId: "N3", totalTerms: 0 },
            { totalScore: 0.79, name: "Charlie", studentId: "N3", totalTerms: 0 },
            { totalScore: 0.85, name: "Eve", studentId: "N5", totalTerms: 0 },
            { totalScore: 0.76, name: "Frank", studentId: "N6", totalTerms: 0 },
        ];
        let cummulativeScore = allTerms.reduce((p, c) => {
            const { totalScore, studentId, name, totalTerms, average } = c;
            const i = p.tracker.get(studentId);
            console.log(allTerms.length);
            console.log("/", average);
            if (totalScore) {
                let count = 1;
                if (i) {
                    p.student[i].totalScore += totalScore;
                    count += 1;
                    p.student[i].totalTerms += 1;
                    p.student[i].average += average;
                }
                else {
                    p.tracker.set(studentId, p.student.length);
                    console.log(totalTerms);
                    p.student.push({
                        studentId,
                        totalScore,
                        name,
                        totalTerms: 1,
                        average,
                    });
                }
            }
            else {
                return p;
            }
            return p;
        }, {
            student: [
                { totalScore: 0.1, studentId: "", name: "", totalTerms: 0, average: 0 },
            ],
            tracker: new Map(),
        }).student;
        cummulativeScore.shift();
        cummulativeScore.map((student) => {
            var _a;
            console.log(student.average);
            student.average = student.average / student.totalTerms;
            console.log(student.average, student.name);
            if (student.average >= (((_a = _school === null || _school === void 0 ? void 0 : _school.gradePoints) === null || _a === void 0 ? void 0 : _a.D) || 40)) {
                let currentClassIndex = promotionClasses.findIndex((currentClass) => currentClass === teacher.formTeacher.substr(0, 4));
                currentClassIndex > -1 &&
                    studentBulkOperations.push({
                        updateOne: {
                            filter: { studentId: student.studentId },
                            update: {
                                $set: {
                                    currentClassLevel: promotionClasses[currentClassIndex + 1 < promotionClasses.length
                                        ? currentClassIndex + 1
                                        : currentClassIndex],
                                    isGraduated: currentClassIndex + 1 > promotionClasses.length,
                                },
                            },
                        },
                    });
                return student;
            }
            return student;
        });
        console.log(cummulativeScore);
        yield database_1.Student.bulkWrite(studentBulkOperations);
        return { groupedData, cummulativeScore };
    });
}
exports.calcResultAndCummulativeAndAutoPromote = calcResultAndCummulativeAndAutoPromote;
// export async function saveResult(student: any, term: number, year: string) {
//   try {
//     await Result.findOne({ student, term, year }).then((resultInstance) => {
//       if (!resultInstance) throw new Error("hi");
//       //im trying to replace result details if it already exists and i want to use bulk write so that i will use only one db call please help me
//     });
//   } catch (error) {
//     throw error;
//   }
// }
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
            let allClassesInThisSchool = yield database_1.ClassLevel.find({
                school,
                schoolId,
            });
            let registeredClasses = [];
            for (let i of allClassesInThisSchool) {
                registeredClasses.push(i.name);
            }
            let allClassesAvailable = [
                "NUR1",
                "NUR2",
                "NUR3",
                "PRY1",
                "PRY2",
                "PRY3",
                "PRY4",
                "PRY5",
                "PRY6",
                "JSS1",
                "JSS2",
                "JSS3",
                "SS1",
                "SS2",
                "SS3",
            ];
            let promotionClasses = [];
            for (let i in registeredClasses) {
                if (allClassesAvailable.includes(registeredClasses[i])) {
                    promotionClasses.push(registeredClasses[i]);
                }
            }
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
            let results = yield calcResult(groupedData, school, schoolId);
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
function teacherGenerateResult(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const { id } = req.params;
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
            const teacher = yield database_1.Teacher.findById(id);
            if (!(teacher === null || teacher === void 0 ? void 0 : teacher.formTeacher))
                throw new decorators_1.CustomError({}, "you are not a form teacher", 400);
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
                            { className: teacher === null || teacher === void 0 ? void 0 : teacher.formTeacher },
                        ],
                    },
                },
            ]).exec();
            let groupedData = lodash_1.default.groupBy(gradesPipeline, (student) => {
                return `${student.studentId.currentClassLevel}${student.studentId.currentClassArm}`;
            });
            let promotionClasses = (yield autoPromote(school, schoolId)) || [];
            // let results = await calcResult(groupedData);
            let results = !term.isPromotionTerm
                ? yield calcResultAndCummulative(groupedData, school, year, schoolId, teacher)
                : yield calcResultAndCummulativeAndAutoPromote(groupedData, school, year, schoolId, teacher, promotionClasses);
            //  await pushResultsToStudents(results, year, term);
            res.status(201).json({
                status: 201,
                msg: ` $ results generated and pushed successfully`,
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
exports.teacherGenerateResult = teacherGenerateResult;
function autoPromote(school, schoolId) {
    return __awaiter(this, void 0, void 0, function* () {
        let registeredClasses = (yield database_1.ClassLevel.find({ school, schoolId })).map((e) => {
            var _a;
            return (_a = e.name) === null || _a === void 0 ? void 0 : _a.substr(0, 4);
        });
        console.log(registeredClasses);
        let allClassesAvailable = [
            "NUR1",
            "NUR2",
            "NUR3",
            "PRY1",
            "PRY2",
            "PRY3",
            "PRY4",
            "PRY5",
            "PRY6",
            "JSS1",
            "JSS2",
            "JSS3",
            "SS1",
            "SS2",
            "SS3",
        ];
        let promotionClasses = [];
        for (let i in allClassesAvailable) {
            if (registeredClasses.includes(allClassesAvailable[i])) {
                promotionClasses.push(allClassesAvailable[i]);
            }
        }
        console.log(promotionClasses);
        return promotionClasses;
    });
}
exports.autoPromote = autoPromote;
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
function DeleteResult(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let { id } = req.params;
        const className = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.formTeacher) || "not a form teacher";
        const school = (_b = req.user) === null || _b === void 0 ? void 0 : _b.school;
        let schoolId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.schoolId;
        let currentYear = yield database_1.AcademicYear.findOne({
            school,
            schoolId,
            isCurrent: true,
        });
        let currentTerm = yield database_1.AcademicTerm.findOne({
            school,
            schoolId,
            isCurrent: true,
        });
        if (!currentTerm || !currentYear)
            throw new decorators_1.CustomError({}, "either current term or current term not set", 400);
        // console.log(,"6512473a6402d7f6a807af3b", student?._id,);
        let result = yield database_1.Result.deleteMany({
            school,
            schoolId,
            year: currentYear === null || currentYear === void 0 ? void 0 : currentYear._id,
            // term: currentTerm?._id,
            studentId: id,
            class: className,
        });
        if (!result)
            throw new decorators_1.CustomError({}, "Result not found  for student for current year ", 404);
        return res.status(200).json({
            msg: "successful deletion ",
            status: 200,
        });
    });
}
exports.DeleteResult = DeleteResult;
