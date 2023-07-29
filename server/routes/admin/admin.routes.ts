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
adminRouter.get("/admin/get/admin", addAdmin);
adminRouter.get("/admin/get/student", addStudent);
adminRouter.get("/admin/get/teacher", addTeacher);
export default adminRouter;
