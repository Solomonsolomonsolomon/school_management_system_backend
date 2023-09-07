"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRouter = (0, express_1.Router)();
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const academicterm_controller_1 = __importDefault(require("../../controller/academicterm.controller"));
const academicyear_controller_1 = __importDefault(require("../../controller/academicyear.controller"));
const classLevel_controller_1 = __importDefault(require("../../controller/classLevel.controller"));
let term = new academicterm_controller_1.default();
let year = new academicyear_controller_1.default();
let classLevel = new classLevel_controller_1.default();
const admin_controller_1 = require("../../controller/admin.controller");
const { addATerm, deleteTerm, setCurrentTerm, getAllTerms, getCurrentTerm } = term;
const { addAcademicYear, addYearAutomatically, getAllYears, getCurrentYear, deleteYear, setCurrentYear, } = year;
const { createClassLevel, deleteClassLevel, getAllClassLevels } = classLevel;
//#adding users
adminRouter.post("/admin/add/admin", admin_controller_1.addAdmin);
adminRouter.post("/admin/add/teacher", (0, globalErrorHandler_1.default)(admin_controller_1.addTeacher));
adminRouter.post("/admin/add/student", (0, globalErrorHandler_1.default)(admin_controller_1.addStudent));
//# removing users
adminRouter.delete("/admin/delete/admin/:id", admin_controller_1.deleteAdmin);
adminRouter.delete("/admin/delete/teacher/:teacherId", admin_controller_1.deleteTeacher);
adminRouter.delete("/admin/delete/student/:studentId", admin_controller_1.deleteStudent);
//# getting users
adminRouter.get("/admin/get/admin", admin_controller_1.getAllAdmin);
adminRouter.get("/admin/get/student", admin_controller_1.getAllStudents);
adminRouter.get("/admin/get/teacher", admin_controller_1.getAllTeachers);
//#editing users
adminRouter.put("/admin/edit/student/:studentId", (0, globalErrorHandler_1.default)(admin_controller_1.editStudent));
adminRouter.put("/admin/edit/teacher/:id", (0, globalErrorHandler_1.default)(admin_controller_1.editTeacher));
//#gender ratio
adminRouter.get("/admin/gender/divide", admin_controller_1.getGenderDivide);
//#no of teachers
adminRouter.get("/admin/get/count/teachers", (0, globalErrorHandler_1.default)(admin_controller_1.countTeachers));
//#term
adminRouter.get("/admin/term/get/all", (0, globalErrorHandler_1.default)(getAllTerms));
adminRouter.post("/admin/term/add", (0, globalErrorHandler_1.default)(addATerm));
adminRouter.post("/admin/term/:id/set/current", (0, globalErrorHandler_1.default)(setCurrentTerm));
adminRouter.delete("/admin/term/:id/delete", (0, globalErrorHandler_1.default)(deleteTerm));
adminRouter.get("/admin/term/get/current", (0, globalErrorHandler_1.default)(getCurrentTerm));
//# year
adminRouter.post("/admin/year/add", (0, globalErrorHandler_1.default)(addAcademicYear));
//addYearAutomatically(); //automatically adds Year first of september
adminRouter.get("/admin/year/get/all", (0, globalErrorHandler_1.default)(getAllYears));
adminRouter.get("/admin/year/get/current", (0, globalErrorHandler_1.default)(getCurrentYear));
adminRouter.delete("/admin/year/:id/delete", (0, globalErrorHandler_1.default)(deleteYear));
adminRouter.post("/admin/year/:id/set/current", (0, globalErrorHandler_1.default)(setCurrentYear));
//#classLevel
adminRouter.get("/admin/class/get/all", (0, globalErrorHandler_1.default)(getAllClassLevels));
adminRouter.post("/admin/class/new", (0, globalErrorHandler_1.default)(createClassLevel));
adminRouter.delete("/admin/class/:id/delete", (0, globalErrorHandler_1.default)(deleteClassLevel));
exports.default = adminRouter;
