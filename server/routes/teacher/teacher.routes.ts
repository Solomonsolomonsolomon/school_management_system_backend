import { Router } from "express";

const teacherRouter: Router = Router();
import { getManagedStudents } from "../../controller/teacher.controller";
teacherRouter.get("/teacher/get/students", getManagedStudents);

export default teacherRouter;
