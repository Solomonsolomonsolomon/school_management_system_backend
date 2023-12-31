import express, { Router, Request, Response } from "express";
const adminRouter: Router = Router();
const app = express();
import asyncErrorHandler from "../../utils/globalErrorHandler";
import AcademicTermController from "../../controller/academicterm.controller";
import AcademicYearController from "../../controller/academicyear.controller";
import ClassLevelController from "../../controller/classLevel.controller";
let term = new AcademicTermController();
let year = new AcademicYearController();
import { Admin } from "../../model/database";
let classLevel = new ClassLevelController();
import {
  addAdmin,
  addTeacher,
  addStudent,
  deleteAdmin,
  deleteStudent,
  deleteTeacher,
  getAllAdmin,
  getAllStudents,
  getAllTeachers,
  getGenderDivide,
  countTeachers,
  editStudent,
  editTeacher,
  resetSchoolTransaction,
  searchStudent,
} from "../../controller/admin.controller";

const {
  addATerm,
  deleteTerm,
  setCurrentTerm,
  getAllTerms,
  getCurrentTerm,
  setPromotionTerm,
  ResetAllTransactionsOnTermChange,
} = term;
const {
  addAcademicYear,
  addYearAutomatically,
  getAllYears,
  getCurrentYear,
  deleteYear,
  setCurrentYear,
} = year;
const {
  createClassLevel,
  deleteClassLevel,
  getAllClassLevels,
  editClassPrice,
} = classLevel;
//#adding users
adminRouter.post("/admin/add/admin", addAdmin);
adminRouter.post("/admin/add/teacher", asyncErrorHandler(addTeacher));
adminRouter.post("/admin/add/student", asyncErrorHandler(addStudent));

//# removing users
adminRouter.delete("/admin/delete/admin/:id", deleteAdmin);
adminRouter.delete("/admin/delete/teacher/:teacherId", deleteTeacher);
adminRouter.delete("/admin/delete/student/:studentId", deleteStudent);

//# getting users
adminRouter.get("/admin/get/admin", getAllAdmin);
adminRouter.get("/admin/get/student", getAllStudents);
adminRouter.get("/admin/get/teacher", getAllTeachers);

//# searching
adminRouter.get(
  "/admin/search/student/:searchParams",
  asyncErrorHandler(searchStudent)
);
//#editing users
adminRouter.put(
  "/admin/edit/student/:studentId",
  asyncErrorHandler(editStudent)
);
adminRouter.put("/admin/edit/teacher/:id", asyncErrorHandler(editTeacher));
//#gender ratio
adminRouter.get("/admin/gender/divide", getGenderDivide);
//#no of teachers
adminRouter.get("/admin/get/count/teachers", asyncErrorHandler(countTeachers));
//#term
adminRouter.get("/admin/term/get/all", asyncErrorHandler(getAllTerms));
adminRouter.post("/admin/term/add", asyncErrorHandler(addATerm));
adminRouter.post(
  "/admin/term/:id/set/current",
  asyncErrorHandler(setCurrentTerm)
);
adminRouter.delete("/admin/term/:id/delete", asyncErrorHandler(deleteTerm));
adminRouter.get("/admin/term/get/current", asyncErrorHandler(getCurrentTerm));
adminRouter.put(
  "/admin/term/:id/set/promotion",
  asyncErrorHandler(setPromotionTerm)
);
adminRouter.put(
  "/admin/term/transactions/reset",
  asyncErrorHandler(ResetAllTransactionsOnTermChange)
);

//# year
adminRouter.post("/admin/year/add", asyncErrorHandler(addAcademicYear));
//addYearAutomatically(); //automatically adds Year first of september
adminRouter.get("/admin/year/get/all", asyncErrorHandler(getAllYears));
adminRouter.get("/admin/year/get/current", asyncErrorHandler(getCurrentYear));
adminRouter.delete("/admin/year/:id/delete", asyncErrorHandler(deleteYear));
adminRouter.post(
  "/admin/year/:id/set/current",
  asyncErrorHandler(setCurrentYear)
);

//#classLevel
adminRouter.get("/admin/class/get/all", asyncErrorHandler(getAllClassLevels));
adminRouter.post("/admin/class/new", asyncErrorHandler(createClassLevel));
adminRouter.delete(
  "/admin/class/:id/delete",
  asyncErrorHandler(deleteClassLevel)
);
adminRouter.put(
  "/admin/class/price/edit/:id/",
  asyncErrorHandler(editClassPrice)
);

adminRouter.get(
  "/admin/reset/student/transaction/",
  asyncErrorHandler(resetSchoolTransaction)
);
export default adminRouter;
