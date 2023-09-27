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
let instance;
class StudentController {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    viewResultsYears(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const student = yield database_1.Student.findById(id);
            if (!student)
                throw new decorators_1.CustomError({}, "cant seem to find student", 500);
            let allResults = yield database_1.Result.find({
                name: student.name,
                studentId: student.studentId,
            }).populate("year term");
            if (!allResults.length)
                throw new decorators_1.CustomError({}, "no result details found", 404);
            let years = [];
            for (let i in allResults) {
                years.push({
                    yearId: (_a = allResults[i].year) === null || _a === void 0 ? void 0 : _a._id,
                    termId: (_b = allResults[i].term) === null || _b === void 0 ? void 0 : _b._id,
                    yearName: (_c = allResults[i].year) === null || _c === void 0 ? void 0 : _c.name,
                    termName: (_d = allResults[i].term) === null || _d === void 0 ? void 0 : _d.name,
                });
            }
            res.status(200).json({
                msg: "results years fetched successfully",
                years,
            });
        });
    }
    getSingleResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, year, term } = req.params;
            console.log(req.params);
            let result = yield database_1.Result.findOne({
                term,
                year,
                id,
            });
            if (!result)
                throw new decorators_1.CustomError({}, "no result details found", 404);
            res.status(200).json({
                msg: "result ",
                status: 200,
                result,
            });
        });
    }
}
let student = Object.freeze(new StudentController());
exports.default = student;
