import {
  Router,
  Request,
  Response,
  NextFunction,
  request,
  response,
} from "express";
const teacherRouter: Router = Router();
import { getManagedStudents } from "../../controller/teacher.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
teacherRouter.get(
  "/teacher/:_id/get/students",
  asyncErrorHandler(getManagedStudents)
);

export default teacherRouter;
