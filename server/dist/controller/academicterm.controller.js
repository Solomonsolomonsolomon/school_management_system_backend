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
const decorators_1 = require("../middleware/decorators");
const database_1 = require("../model/database");
const mongoose_1 = __importDefault(require("mongoose"));
const SchoolBus_1 = require("../model/others/SchoolBus");
//#please note that the routes for this controller are in admin.routes not academicTerm
class AcademicTermController {
    /**
     * getAllTerms
     * addATerm
     * setCurrentTerm
     * deleteATerm
     * setPromotionTerm
     * ResetAllTransactionsOnTermChange
     */
    getAllTerms(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let allTerms = yield database_1.AcademicTerm.find({ school });
            if (!allTerms.length)
                throw new decorators_1.CustomError({}, "no terms found", 404);
            res.status(200).json({
                status: 200,
                msg: "all terms data",
                terms: allTerms,
                school,
                schoolId,
            });
        });
    }
    addATerm(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let name = req.body.name;
            let termExists = yield database_1.AcademicTerm.findOne({ name, school });
            if (termExists)
                throw new decorators_1.CustomError({}, "term has been added already", 400);
            let newTerm = yield new database_1.AcademicTerm(Object.assign(Object.assign({ createdBy: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, req.body), { school,
                schoolId }));
            yield newTerm
                .save()
                .then((term) => res.json({ status: "2xx", msg: "term added successfully", term }));
        });
    }
    setCurrentTerm(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let _id = yield new mongoose_1.default.Types.ObjectId(id);
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let previous = yield database_1.AcademicTerm.findOne({
                isCurrent: true,
                school,
                schoolId,
            });
            if (previous) {
                previous.isCurrent = false;
                yield previous.save().catch((err) => {
                    throw new decorators_1.CustomError(err, err.message, 400);
                });
            }
            let current = yield database_1.AcademicTerm.findOne({ _id });
            current.isCurrent = true;
            current.updatedBy = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
            yield current
                .save()
                .then((current) => {
                res.status(200).json({
                    status: 200,
                    msg: "current set",
                    current,
                });
            })
                .catch((err) => {
                throw new decorators_1.CustomError({}, err.message, 400);
            });
        });
    }
    deleteTerm(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let _id = new mongoose_1.default.Types.ObjectId(id);
            let isCurrent = !!(yield database_1.AcademicTerm.findOne({
                _id,
                isCurrent: true,
                school,
                schoolId,
            }));
            if (isCurrent)
                throw new decorators_1.CustomError({}, "cannot delete current term", 403);
            let term = yield database_1.AcademicTerm.findOneAndRemove({ _id, school, schoolId });
            if (!term) {
                throw new decorators_1.CustomError({}, "term already deleted or term doesnt exist", 404);
            }
            else {
                res.status(200).json({ status: "2xx", msg: "term deleted successfully" });
            }
        });
    }
    getCurrentTerm(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            yield database_1.AcademicTerm.findOne({
                isCurrent: true,
                schoolId,
            }).then((currentTerm) => {
                if (!currentTerm)
                    throw new decorators_1.CustomError({}, "no current term set,set new term", 404);
                res.status(200).json({
                    status: 200,
                    message: "current term found",
                    currentTerm,
                });
            });
        });
    }
    setPromotionTerm(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let _id = yield new mongoose_1.default.Types.ObjectId(id);
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let previous = yield database_1.AcademicTerm.findOne({
                isPromotionTerm: true,
                school,
                schoolId,
            });
            if (previous) {
                previous.isPromotionTerm = false;
                yield previous.save().catch((err) => {
                    throw new decorators_1.CustomError(err, err.message, 400);
                });
            }
            let current = yield database_1.AcademicTerm.findOne({ _id });
            current.isPromotionTerm = true;
            current.updatedBy = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
            yield current
                .save()
                .then((current) => {
                console.log("here");
                res.status(200).json({
                    status: 200,
                    msg: "current set",
                    current,
                });
            })
                .catch((err) => {
                throw new decorators_1.CustomError({}, err.message, 400);
            });
        });
    }
    ResetAllTransactionsOnTermChange(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            const bulkOperations = [];
            const busBulkOperations = [];
            let allStudents = yield database_1.Student.find({
                school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
                schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
            });
            let allStudentsInBus = yield database_1.Bus.find({
                school: (_c = req.user) === null || _c === void 0 ? void 0 : _c.school,
                schoolId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.schoolId,
            });
            for (let i = 0; i <= allStudents.length - 1; i++) {
                let cl = yield database_1.ClassLevel.findOne({ name: allStudents[i].className });
                console.log(allStudents[i]._id, cl === null || cl === void 0 ? void 0 : cl.price);
                bulkOperations.push({
                    updateOne: {
                        filter: {
                            school: (_e = req.user) === null || _e === void 0 ? void 0 : _e.school,
                            schoolId: (_f = req.user) === null || _f === void 0 ? void 0 : _f.schoolId,
                            _id: allStudents[i]._id,
                        },
                        update: {
                            $set: { isPaid: false, balance: cl === null || cl === void 0 ? void 0 : cl.price, percentagePaid: 0 },
                        },
                    },
                });
            }
            for (let i = 0; i <= allStudentsInBus.length - 1; i++) {
                let cl = yield SchoolBus_1.schoolBus.findOne({
                    school: (_g = req.user) === null || _g === void 0 ? void 0 : _g.school,
                    schoolId: (_h = req.user) === null || _h === void 0 ? void 0 : _h.schoolId,
                });
                i;
                busBulkOperations.push({
                    updateOne: {
                        filter: {
                            school: (_j = req.user) === null || _j === void 0 ? void 0 : _j.school,
                            schoolId: (_k = req.user) === null || _k === void 0 ? void 0 : _k.schoolId,
                            studentId: allStudentsInBus[i].studentId,
                        },
                        update: {
                            $set: { isPaid: false, balance: cl.price, percentagePaid: 0 },
                        },
                    },
                });
            }
            yield database_1.Student.bulkWrite(bulkOperations);
            yield database_1.Bus.bulkWrite(busBulkOperations);
            return res.status(200).json({
                msg: 200,
                status: "successful ",
            });
        });
    }
}
exports.default = AcademicTermController;
