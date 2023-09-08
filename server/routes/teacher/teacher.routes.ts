import {
  Router,
  Request,
  Response,
  NextFunction,
  request,
  response,
} from "express";
const teacherRouter: Router = Router();
import {
  managedStudents,
  getStudentsTaught,
} from "../../controller/teacher.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
teacherRouter.get(
  "/teacher/:_id/get/students",
  asyncErrorHandler(managedStudents)
);
teacherRouter.get(
  "/teacher/:id/get/students/taught",
  asyncErrorHandler(getStudentsTaught)
);

export default teacherRouter;
