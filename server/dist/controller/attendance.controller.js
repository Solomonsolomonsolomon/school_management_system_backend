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
exports.attendance = void 0;
const decorators_1 = require("../middleware/decorators");
const Attendance_1 = __importDefault(require("../model/academic/Attendance"));
const database_1 = require("../model/database");
let instance;
class AttendanceController {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    getAttendanceDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { id, className } = req.params;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let year = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            let term = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            if (!year || !term)
                throw new decorators_1.CustomError({}, "set year and term to get attendance records", 400);
            let details = yield Attendance_1.default.findOne({
                studentId: id,
                className,
                year,
                term,
            });
            if (!details)
                throw new decorators_1.CustomError({}, "no recorded attendance", 404);
            res.status(200).json({
                msg: "attendance details",
                attendance: details,
            });
        });
    }
    setAttendanceDetails(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const { date, status } = req.body;
            const { id, className } = req.params;
            let year = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            let term = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            if (!year || !term)
                throw new decorators_1.CustomError({}, "set year and term to set attendance record", 400);
            let details = yield Attendance_1.default.findOne({
                studentId: id,
                className,
                year,
                term,
            });
            //if no attendance details,create it
            if (!details) {
                yield new Attendance_1.default(Object.assign(Object.assign({ studentId: id, className, school: (_c = req.user) === null || _c === void 0 ? void 0 : _c.school, schoolId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.schoolId, year,
                    term }, req.body), { attendanceDetails: {
                        date,
                        status,
                    } })).save();
            }
            else {
                //else append to existing
                if (!(details === null || details === void 0 ? void 0 : details.attendanceDetails))
                    throw new decorators_1.CustomError({}, "no attendance details found", 400);
                for (let i of details === null || details === void 0 ? void 0 : details.attendanceDetails) {
                    if (i.date === date) {
                        throw new decorators_1.CustomError({}, "Attendance already computed", 400);
                    }
                }
                details.attendanceDetails.push(Object.assign({}, req.body));
                yield details.save();
            }
            return res.status(201).json({
                msg: "successful addition",
                status: 201,
            });
        });
    }
    EditAttendanceDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            const { date, status } = req.body;
            const { id, className } = req.params;
            let year = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            let term = yield database_1.AcademicYear.findOne({
                school,
                schoolId,
                isCurrent: true,
            });
            if (!year || !term)
                throw new decorators_1.CustomError({}, "set year and term to update attendance record", 400);
            let details = yield Attendance_1.default.findOne({
                studentId: id,
                className,
                year,
                term,
            });
            if (!details)
                throw new decorators_1.CustomError({}, "no recorded attendance", 404);
            let version = details.__v;
            let oldAttendance = details.attendanceDetails;
            let oldDetails = oldAttendance.find((record) => record.date === date);
            if (!oldDetails)
                throw new decorators_1.CustomError({}, "error fetching previous attendance record", 400);
            Object.assign(oldDetails, req.body);
            details.__v = version;
            yield details.save();
            return res.status(200).json({
                msg: "successful update",
                status: 200,
            });
        });
    }
}
let attendance = Object.freeze(new AttendanceController());
exports.attendance = attendance;
