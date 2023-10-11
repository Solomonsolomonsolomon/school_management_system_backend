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
const database_1 = require("../model/database");
const decorators_1 = require("../middleware/decorators");
const SchoolBus_1 = require("../model/others/SchoolBus");
decorators_1.CustomError;
let instance;
class BusController {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    registerForBus(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let { studentId } = req.body;
            let isValidStudentId = !!(yield database_1.Student.countDocuments({ studentId }));
            if (!isValidStudentId)
                throw new decorators_1.CustomError({}, "Enter valid student id", 400);
            let bus = yield SchoolBus_1.schoolBus.findOne({ school, schoolId });
            if (!bus || !bus.price)
                throw new decorators_1.CustomError({}, "Register school`s bus details", 400);
            let isStudentRegistered = !!(yield database_1.Bus.findOne({ studentId }));
            if (isStudentRegistered)
                throw new decorators_1.CustomError({}, "student already registered for bus", 400);
            if (!bus.noOfSeats || bus.noOfSeats - 1 < 1)
                throw new decorators_1.CustomError({}, "No available seats left on bus", 400);
            yield new database_1.Bus({
                studentId,
                school,
                isPaid: false,
                schoolId,
                percentagePaid: 0,
                balance: bus === null || bus === void 0 ? void 0 : bus.price,
                amountPaid: 0,
                address: req.body.address,
            }).save();
            bus.noOfSeats--;
            yield bus.save();
            return res.status(201).json({
                msg: "student added to bus",
                status: 201,
            });
        });
    }
    payBusFees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studentId } = req.params;
            let { amountPaid } = req.body;
            let bus = yield database_1.Bus.findOne({ studentId });
            if (!bus)
                throw new decorators_1.CustomError({}, "student details not found ", 500);
            bus.amountPaid = amountPaid;
            req.body.isPaid ? (bus.isPaid = req.body.isPaid) : "";
            yield bus.save();
            return res.status(200).json({
                msg: "successful payment",
                status: 200,
            });
        });
    }
    resetAllBusDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let bulkOperations = [];
            let bus = yield SchoolBus_1.schoolBus.findOne({ school, schoolId });
            if (!bus || !bus.price)
                throw new decorators_1.CustomError({}, "school`s bus details not found", 400);
            let students = yield database_1.Bus.find({ school, schoolId });
            for (let i of students) {
                bulkOperations.push({
                    updateOne: {
                        filter: { school, schoolId },
                        update: {
                            $set: {
                                balance: bus.price,
                                percentagePaid: 0,
                                amountPaid: 0,
                                isPaid: false,
                            },
                        },
                    },
                });
            }
            yield database_1.Bus.bulkWrite(bulkOperations);
            return res.status(200).json({
                msg: "reset successful",
            });
        });
    }
    registerSchoolBusDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let bus = yield SchoolBus_1.schoolBus.findOne({ school, schoolId });
            if (bus)
                throw new decorators_1.CustomError({}, "school bus details already on record", 400);
            yield new SchoolBus_1.schoolBus(Object.assign({ school, schoolId }, req.body)).save();
            return res
                .status(201)
                .json({ msg: "school bus details registered", status: 200 });
        });
    }
    editSchoolBusDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let bus = yield SchoolBus_1.schoolBus.findOne({ school, schoolId });
            if (!bus)
                throw new decorators_1.CustomError({}, "school bus details  not found", 400);
            let version = bus.__v;
            Object.assign(bus, req.body);
            bus.__v = version;
            yield bus.save();
            return res
                .status(201)
                .json({ msg: "school bus details edited", status: 200 });
        });
    }
    editStudentBusDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let studentId = req.params.studentId;
            let bus = yield database_1.Bus.findOne({ school, schoolId, studentId });
            if (!bus)
                throw new decorators_1.CustomError({}, "student details  not found in bus records", 500);
            let version = bus.__v;
            Object.assign(bus, req.body);
            bus.__v = version;
            yield bus.save();
            return res
                .status(201)
                .json({ msg: "student bus details edited", status: 200 });
        });
    }
    getAllStudentsTakingBus(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            // let allStudents = await Bus.find({ school, schoolId });
            let totalStudents = yield database_1.Bus.countDocuments({ school, schoolId });
            if (!totalStudents)
                throw new decorators_1.CustomError({}, "No students added to bus line", 400);
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const skip = (page - 1) * pageSize;
            const totalPages = Math.ceil(totalStudents / pageSize);
            const students = yield database_1.Bus.find({ school, schoolId })
                .skip(skip)
                .limit(pageSize)
                .populate("id")
                .sort({ id: 1 })
                .exec();
            res.status(200).json({
                msg: "Students taking the bus",
                bus: students,
                status: 200,
                page,
                pageSize,
                totalPages,
                totalStudents,
            });
        });
    }
    deleteSingleStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { studentId } = req.params;
            let bus = yield database_1.Bus.findOneAndDelete({ studentId });
            if (!bus)
                throw new decorators_1.CustomError({}, "couldnt delete", 400);
            res.status(200).json({
                status: 200,
                msg: "deleted successfully",
            });
        });
    }
    getSchoolDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let schoolDetails = yield SchoolBus_1.schoolBus.findOne({
                school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
                schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
            });
            if (!schoolDetails)
                throw new decorators_1.CustomError({}, "school bus details not registered", 400);
            res.status(200).json({
                msg: "school details",
                status: 200,
                schoolDetails,
            });
        });
    }
}
exports.default = Object.freeze(new BusController());
