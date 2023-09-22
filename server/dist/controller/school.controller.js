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
let oldThemes = {
    button: "#4B5563",
    header: "#edf2f7",
    text: "#000000",
    sideBar: "#4a5568",
    sideBarText: "#ffffff",
    background: "#ffffff",
    loginImg: "#ffffff",
    buttonText: "#ffffff",
};
class SchoolController {
    constructor() { }
    changeTheme(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let schoolId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
            let school = (_b = req.user) === null || _b === void 0 ? void 0 : _b.school;
            let sch = yield database_1.School.findOne({ schoolId, school });
            if (!sch)
                return yield database_1.School.create({
                    school,
                    schoolId,
                    themes: Object.assign(oldThemes, req.body),
                });
            let version = sch.__v;
            Object.assign(sch.themes, req.body);
            sch.__v = version;
            yield sch.save();
            res.status(200).json({
                status: 200,
                msg: "successful update",
            });
        });
    }
    getCurrentTheme(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let schoolId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
            let school = (_b = req.user) === null || _b === void 0 ? void 0 : _b.school;
            console.log(schoolId, school);
            let theSchool = yield database_1.School.findOne({ schoolId });
            if (!theSchool)
                throw new decorators_1.CustomError({}, "school details not found", 404);
            res.status(200).json({
                msg: "theme",
                status: 200,
                themes: theSchool.themes,
            });
        });
    }
    getDefaultTheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                status: 200,
                msg: "default theme settings",
                default: {
                    button: "#4B5563",
                    header: "#edf2f7",
                    text: "#000000",
                    sideBar: "#4a5568",
                    sideBarText: "#ffffff",
                    background: "#ffffff",
                    loginImg: "#ffffff",
                    buttonText: "#ffffff",
                },
            });
        });
    }
    insertLogo(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let schoolId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
            let school = (_b = req.user) === null || _b === void 0 ? void 0 : _b.school;
            let { logo } = req.body;
            let sch = yield database_1.School.findOne({ schoolId, school });
            if (!sch)
                return yield database_1.School.create({ school, schoolId, logo });
            let version = sch.__v;
            Object.assign(sch, req.body);
            sch.__v = version;
            yield sch.save();
            res.status(200).json({
                status: 200,
                msg: "successful update",
            });
        });
    }
    getLogo(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let sch = yield database_1.School.findOne({ schoolId });
            if (!sch)
                throw new decorators_1.CustomError({}, "school details not found", 404);
            res.status(200).json({
                msg: "logo",
                status: 200,
                logo: sch.logo,
            });
        });
    }
    logoAndThemes(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let schoolId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId;
            let sch = yield database_1.School.findOne({ schoolId });
            if (!sch)
                throw new decorators_1.CustomError({}, "school details not found", 404);
            res.status(200).json({
                msg: "logo and themes",
                status: 200,
                logo: sch.logo,
                themes: sch.themes,
            });
        });
    }
}
exports.default = SchoolController;
