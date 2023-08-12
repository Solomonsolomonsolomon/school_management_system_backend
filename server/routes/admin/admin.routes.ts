import { Router } from "express";
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
const adminRouter: Router = Router();
//#adding users
adminRouter.post("/admin/add/admin", addAdmin);
adminRouter.post("/admin/add/teacher", addTeacher);
adminRouter.post("/admin/add/student", addStudent);
//# removing users
adminRouter.delete("/admin/delete/admin/:id", deleteAdmin);
adminRouter.delete("/admin/delete/teacher/:teacherId", deleteTeacher);
adminRouter.delete("/admin/delete/student/:studentId", deleteStudent);
//# getting users
adminRouter.get("/admin/get/admin", getAllAdmin);
adminRouter.get("/admin/get/student", getAllStudents);
adminRouter.get("/admin/get/teacher", getAllTeachers);
//#
adminRouter.get("/admin/gender/divide", getGenderDivide);
export default adminRouter;
