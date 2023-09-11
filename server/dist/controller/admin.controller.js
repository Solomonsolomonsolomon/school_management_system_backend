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
exports.countParents = exports.editTeacher = exports.editStudent = exports.countTeachers = exports.getGenderDivide = exports.getAllTeachers = exports.getAllStudents = exports.getAllAdmin = exports.deleteTeacher = exports.deleteStudent = exports.deleteAdmin = exports.addStudent = exports.addTeacher = exports.addAdmin = void 0;
const decorators_1 = require("../middleware/decorators");
const database_1 = require("./../model/database");
function addAdmin(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { name, email, password, role } = req.body;
            let school = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.school) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.school);
            let schoolId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.schoolId;
            yield database_1.Admin.findOne({ email }).then((alreadyRegistered) => __awaiter(this, void 0, void 0, function* () {
                if (alreadyRegistered) {
                    throw new Error("This particular admin already registered");
                }
                else {
                    yield new database_1.Admin({
                        name,
                        email,
                        password,
                        school,
                        schoolId,
                        role,
                    })
                        .save()
                        .then((admin) => {
                        res.json({
                            msg: "admin added successfully",
                            status: 200,
                            admin,
                        });
                    })
                        .catch((err) => {
                        throw err;
                    });
                }
            }));
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                error,
                err: error.message,
                msg: "failed to add admin",
            });
        }
    });
}
exports.addAdmin = addAdmin;
function addTeacher(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let { name, email, password, role, dateEmployed, formTeacher } = req.body;
            yield database_1.Teacher.findOne({ email, schoolId }).then((alreadyRegistered) => __awaiter(this, void 0, void 0, function* () {
                if (alreadyRegistered) {
                    throw new Error("This particular teacher already registered");
                }
                else {
                    yield new database_1.Teacher(Object.assign(Object.assign({}, req.body), { school,
                        schoolId }))
                        .save()
                        .then((teacher) => {
                        res.json({
                            msg: "teacher added successfully",
                            status: 200,
                            teacher,
                        });
                    })
                        .catch((err) => {
                        throw err;
                    });
                }
            }));
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                error,
                err: error.message,
                msg: "failed to add teacher",
            });
        }
    });
}
exports.addTeacher = addTeacher;
function addStudent(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let { name, email, currentClassLevel, currentClassArm } = req.body;
        let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
        let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
        let isStudentAlreadyRegistered = !!(yield database_1.Student.countDocuments({
            name,
            school,
            schoolId,
        }));
        if (isStudentAlreadyRegistered)
            throw new decorators_1.CustomError({}, "student already registered", 403);
        let isClassAvailable = !!(yield database_1.ClassLevel.countDocuments({
            name: `${currentClassLevel}${currentClassArm}`,
            school,
            schoolId,
        }));
        if (!isClassAvailable)
            throw new decorators_1.CustomError({}, "the class you selected is not available.please register and try again", 404);
        let newStudent = new database_1.Student(Object.assign(Object.assign({}, req.body), { school,
            schoolId }));
        yield newStudent.save();
        res.status(201).json({
            status: 201,
            msg: "registered student successfully",
        });
    });
}
exports.addStudent = addStudent;
function deleteAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield database_1.Admin.findOneAndRemove({ _id: id })
                .then((user) => {
                if (!user) {
                    throw new Error("Invalid Admin Id");
                }
                res.status(200).json({
                    status: 200,
                    msg: "deleted admin successfully",
                    user,
                });
            })
                .catch((err) => {
                throw err;
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: "failed to delete user",
                err: error.message,
                error,
            });
        }
    });
}
exports.deleteAdmin = deleteAdmin;
function deleteStudent(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const { studentId } = req.params;
            yield database_1.Student.findOneAndRemove({ studentId, school })
                .then((user) => {
                if (!user) {
                    throw new Error("Invalid studentId");
                }
                res.status(200).json({
                    status: 200,
                    msg: "deleted student successfully",
                    user,
                });
            })
                .catch((err) => {
                throw err;
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: "failed to delete user",
                err: error.message,
                error,
            });
        }
    });
}
exports.deleteStudent = deleteStudent;
function deleteTeacher(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { teacherId } = req.params;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            yield database_1.Teacher.findOneAndRemove({ teacherId, school, schoolId })
                .then((user) => {
                if (!user) {
                    throw new Error("Invalid teacherId");
                }
                res.status(200).json({
                    status: 200,
                    msg: "deleted teacher successfully",
                    user,
                });
            })
                .catch((err) => {
                throw err;
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: "failed to delete user",
                err: error.message,
                error,
            });
        }
    });
}
exports.deleteTeacher = deleteTeacher;
function getAllAdmin(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            yield database_1.Admin.find({ school, schoolId }).then((admins) => {
                if (admins.length < 1)
                    throw new Error("No admin found");
                res.status(200).json({
                    status: 200,
                    msg: "all admins fetched successfully",
                    admins,
                });
            });
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                msg: "internal server error.its not your fault",
                error,
                err: error.message,
            });
        }
    });
}
exports.getAllAdmin = getAllAdmin;
function getAllStudents(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let schoolId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
            yield database_1.Student.find({ school: (_b = req.user) === null || _b === void 0 ? void 0 : _b.school, schoolId })
                .sort({ name: 1 })
                .then((student) => {
                if (student.length < 1)
                    throw new Error("No student found");
                res.status(200).json({
                    status: 200,
                    msg: "all students fetched successfully",
                    student,
                });
            });
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                msg: error.message,
                error,
                err: error.message,
            });
        }
    });
}
exports.getAllStudents = getAllStudents;
function getAllTeachers(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let school = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            yield database_1.Teacher.find({ school, schoolId })
                .populate("subjects")
                .then((teacher) => {
                if (teacher.length < 1)
                    throw new Error("No teacher found");
                res.status(200).json({
                    status: 200,
                    msg: "all teachers fetched successfully",
                    teacher,
                });
            });
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                msg: "internal server error.its not your fault",
                error,
                err: error.message,
            });
        }
    });
}
exports.getAllTeachers = getAllTeachers;
function getGenderDivide(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let schoolId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
            let totalStudents = yield database_1.Student.find({
                school: (_b = req.user) === null || _b === void 0 ? void 0 : _b.school,
                schoolId,
            });
            let males = 0;
            let females = 0;
            totalStudents.forEach((student) => {
                student.gender == "M" ? (males += 1) : (females += 1);
            });
            res.status(200).json({
                status: 200,
                msg: `female to male ratio is ${females / females}to${males / females} .please note that this may be inaccurate,perform your own calculation`,
                females,
                males,
                totalStudents: totalStudents.length,
            });
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                msg: "internal server error!..an error occured but its not your fault",
                err: error.message,
                error,
            });
        }
    });
}
exports.getGenderDivide = getGenderDivide;
function countTeachers(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let school = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.school;
        let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
        let noOfTeachers = yield database_1.Teacher.countDocuments({ school, schoolId });
        res.status(200).json({
            status: 200,
            msg: "teachers number found",
            noOfTeachers,
        });
    });
}
exports.countTeachers = countTeachers;
function editStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { studentId } = req.params;
        const { currentClassLevel, currentClassArm } = req.body;
        let student = yield database_1.Student.findOne({ studentId });
        if (!student)
            throw new decorators_1.CustomError({}, "student not found", 404);
        let name = `${currentClassLevel}${currentClassArm}`;
        let isValidClass = !!(yield database_1.ClassLevel.countDocuments({
            name,
        }));
        if (!isValidClass)
            throw new decorators_1.CustomError({}, "enter existing class Level", 404);
        let newStudentDetails = req.body;
        let currrentVersion = student.__v;
        Object.assign(student, newStudentDetails);
        student.__v = currrentVersion;
        yield student.save();
        res.status(200).json({
            status: 200,
            msg: "edited successfully",
        });
    });
}
exports.editStudent = editStudent;
function editTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        // const { email } = req.body;
        let teacher = yield database_1.Teacher.findOne({ _id: id });
        if (!teacher)
            throw new decorators_1.CustomError({}, "teacher not found", 404);
        //   throw new CustomError({}, "enter existing class Level", 404);
        let newteacherDetails = req.body;
        let currrentVersion = teacher.__v;
        Object.assign(teacher, newteacherDetails);
        teacher.__v = currrentVersion;
        yield teacher.save();
        res.status(200).json({
            status: 200,
            msg: "edited successfully",
        });
    });
}
exports.editTeacher = editTeacher;
function countParents(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
        let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
        yield database_1.Student.countDocuments({ school, schoolId }).then((e) => {
            res.status(200).json({
                msg: "parents number found",
                parents: e,
            });
        });
    });
}
exports.countParents = countParents;
