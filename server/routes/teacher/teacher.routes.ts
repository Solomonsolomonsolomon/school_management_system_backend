import { Router } from "express";

const teacherRouter: Router = Router();
import { getManagedStudents } from "../../controller/teacher.controller";
teacherRouter.get("/teacher/:_id/get/students", getManagedStudents);

export default teacherRouter;
