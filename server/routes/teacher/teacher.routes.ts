import {
  Router,
  Request,
  Response,
  NextFunction,
  request,
  response,
} from "express";
const teacherRouter: Router = Router();
import { managedStudents } from "../../controller/teacher.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
teacherRouter.get(
  "/teacher/:_id/get/students",
  asyncErrorHandler(managedStudents)
);

export default teacherRouter;
