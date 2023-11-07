"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const adminRouter = (0, express_1.Router)();
const app = (0, express_1.default)();
const globalErrorHandler_1 = __importDefault(require("../../middleware/globalErrorHandler"));
const academicterm_controller_1 = __importDefault(require("../../controller/academicterm.controller"));
const academicyear_controller_1 = __importDefault(require("../../controller/academicyear.controller"));
const classLevel_controller_1 = __importDefault(require("../../controller/classLevel.controller"));
let term = new academicterm_controller_1.default();
let year = new academicyear_controller_1.default();
let classLevel = new classLevel_controller_1.default();
const admin_controller_1 = require("../../controller/admin.controller");
const { addATerm, deleteTerm, setCurrentTerm, getAllTerms, getCurrentTerm, setPromotionTerm, ResetAllTransactionsOnTermChange, } = term;
const { addAcademicYear, addYearAutomatically, getAllYears, getCurrentYear, deleteYear, setCurrentYear, } = year;
const { createClassLevel, deleteClassLevel, getAllClassLevels, editClassPrice, } = classLevel;
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
//# searching
adminRouter.get("/admin/search/student/:searchParams", (0, globalErrorHandler_1.default)(admin_controller_1.searchStudent));
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
adminRouter.put("/admin/term/:id/set/promotion", (0, globalErrorHandler_1.default)(setPromotionTerm));
adminRouter.put("/admin/term/transactions/reset", (0, globalErrorHandler_1.default)(ResetAllTransactionsOnTermChange));
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
adminRouter.put("/admin/class/price/edit/:id/", (0, globalErrorHandler_1.default)(editClassPrice));
adminRouter.get("/admin/reset/student/transaction/", (0, globalErrorHandler_1.default)(admin_controller_1.resetSchoolTransaction));
exports.default = adminRouter;
