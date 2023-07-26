import { Router } from "express";
import {
  addAdmin,
  addTeacher,
  addStudent,
} from "../../controller/admin.controller";
const adminRouter: Router = Router();
//#adding users
adminRouter.post("/admin/add/admin", addAdmin);
adminRouter.post("/admin/add/teacher", addTeacher);
adminRouter.post("/admin/add/student", addStudent);
//# removing users
export default adminRouter;
