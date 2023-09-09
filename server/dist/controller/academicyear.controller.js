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
const node_cron_1 = __importDefault(require("node-cron"));
const database_1 = require("../model/database");
const mongoose_1 = __importDefault(require("mongoose"));
class AcademicYearController {
    /**
     * addAcademicYear
     * addYearAutomatically
     * getAllYears
     * getCurrentYear
     * deleteYear
     * setCurrentYear
     */
    constructor() {
        this.addAcademicYear = this.addAcademicYear.bind(this);
        this.addYearAutomatically = this.addYearAutomatically.bind(this);
        this.setCurrentYear = this.setCurrentYear.bind(this);
    }
    // public async makeCurrent(year: any) {
    //   let previous = await AcademicYear.findOne({ isCurrent: true });
    //   if (previous) {
    //     previous.isCurrent = false;
    //    await previous.save();
    //   }
    //    year.isCurrent = true;
    // }
    makeCurrent(schoolId, term) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let previous = yield database_1.AcademicYear.findOne({ isCurrent: true, schoolId });
                if (previous) {
                    previous.isCurrent = false;
                    yield previous.save().catch((err) => {
                        throw new decorators_1.CustomError(err, err.message, 400);
                    });
                }
                term.isCurrent = true;
                yield term.save();
            }
            catch (error) {
                console.error(error);
                throw new decorators_1.CustomError(error, "Error while setting current term", 500);
            }
        });
    }
    addAcademicYear(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let { fromYear, toYear } = req.body;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let name = `${fromYear}/${toYear}`;
            let year = yield database_1.AcademicYear.findOne({ name, schoolId });
            if (year) {
                throw new decorators_1.CustomError({}, "year already added", 403);
            }
            else {
                let newYear = yield new database_1.AcademicYear({
                    name,
                    fromYear,
                    toYear,
                    school,
                    schoolId,
                    createdBy: req.user._id,
                });
                yield this.makeCurrent(schoolId, newYear);
                newYear.save().then((year) => {
                    res.status(201).json({
                        status: 201,
                        msg: "academic year added successfully",
                        year,
                    });
                });
            }
        });
    }
    addYearAutomatically(school) {
        return __awaiter(this, void 0, void 0, function* () {
            yield node_cron_1.default.schedule("0 0 * 9 * ", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    let date = new Date();
                    let name = `${date.getFullYear()}/${date.getFullYear() + 1}`;
                    let yearAlreadyAdded = yield database_1.AcademicYear.findOne({ name });
                    if (yearAlreadyAdded)
                        throw new decorators_1.CustomError({}, "year already exists", 400);
                    let newYear = new database_1.AcademicYear({
                        name,
                        fromYear: date.getFullYear(),
                        toYear: date.getFullYear() + 1,
                        createdByBot: true,
                    });
                    yield this.makeCurrent(school, newYear);
                    yield newYear.save();
                    console.log("added successfully");
                }
                catch (error) {
                    console.error(error.message);
                }
            }));
        });
    }
    getAllYears(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            yield database_1.AcademicYear.find({ school, schoolId }).then((years) => {
                if (years.length < 1)
                    throw new decorators_1.CustomError({}, "no years found", 404);
                res.status(200).json({
                    status: 200,
                    msg: "all years",
                    years,
                });
            });
        });
    }
    getCurrentYear(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let current = yield database_1.AcademicYear.findOne({ isCurrent: true, school, schoolId });
            if (!current)
                throw new decorators_1.CustomError({}, "no current year,please set current year", 404);
            yield res.status(200).json({
                status: 200,
                msg: "current year fetched successfully",
                current,
            });
        });
    }
    deleteYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let _id = yield new mongoose_1.default.Types.ObjectId(id);
            let isCurrent = !!(yield database_1.AcademicYear.findOne({ _id, isCurrent: true }));
            if (isCurrent)
                throw new decorators_1.CustomError({}, "cannot delete current year", 403);
            let termToDelete = yield database_1.AcademicYear.findOneAndRemove({ _id });
            if (!termToDelete)
                throw new decorators_1.CustomError({}, "year doesn't exist or year already deleted", 404);
            res.status(200).json({
                status: 200,
                msg: "deleted year successfully",
            });
        });
    }
    setCurrentYear(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let _id = yield new mongoose_1.default.Types.ObjectId(id);
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let previous = yield database_1.AcademicYear.findOne({ isCurrent: true, school, schoolId });
            if (previous) {
                previous.isCurrent = false;
                yield previous.save().catch((err) => {
                    throw new decorators_1.CustomError(err, err.message, 400);
                });
            }
            let current = yield database_1.AcademicYear.findOne({ _id });
            if (!current)
                throw new decorators_1.CustomError({}, "year not found", 404);
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
}
exports.default = AcademicYearController;
