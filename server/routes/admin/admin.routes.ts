import express, { Router } from "express";
const adminRouter: Router = Router();
import asyncErrorHandler from "../../middleware/globalErrorHandler";
import AcademicTermController from "../../controller/academicterm.controller";
import AcademicYearController from "../../controller/academicyear.controller";
import ClassLevelController from "../../controller/classLevel.controller";
let term = new AcademicTermController();
let year = new AcademicYearController();
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
} from "../../controller/admin.controller";
const { addATerm, deleteTerm, setCurrentTerm, getAllTerms, getCurrentTerm } =
  term;
const {
  addAcademicYear,
  addYearAutomatically,
  getAllYears,
  getCurrentYear,
  deleteYear,
  setCurrentYear,
} = year;
const { createClassLevel, deleteClassLevel, getAllClassLevels } = classLevel;
//#adding users
adminRouter.post("/admin/add/admin", addAdmin);
adminRouter.post("/admin/add/teacher", addTeacher);
adminRouter.post("/admin/add/student", asyncErrorHandler(addStudent));

//# removing users
adminRouter.delete("/admin/delete/admin/:id", deleteAdmin);
adminRouter.delete("/admin/delete/teacher/:teacherId", deleteTeacher);
adminRouter.delete("/admin/delete/student/:studentId", deleteStudent);

//# getting users
adminRouter.get("/admin/get/admin", getAllAdmin);
adminRouter.get("/admin/get/student", getAllStudents);
adminRouter.get("/admin/get/teacher", getAllTeachers);

//#gender ratio
adminRouter.get("/admin/gender/divide", getGenderDivide);

//#term
adminRouter.get("/admin/term/get/all", asyncErrorHandler(getAllTerms));
adminRouter.post("/admin/term/add", asyncErrorHandler(addATerm));
adminRouter.post(
  "/admin/term/:id/set/current",
  asyncErrorHandler(setCurrentTerm)
);
adminRouter.delete("/admin/term/:id/delete", asyncErrorHandler(deleteTerm));
adminRouter.get("/admin/term/get/current", asyncErrorHandler(getCurrentTerm));

//# year
adminRouter.post("/admin/year/add", asyncErrorHandler(addAcademicYear));
addYearAutomatically(); //automatically adds Year first of september
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
export default adminRouter;
