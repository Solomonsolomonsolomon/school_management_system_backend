import { Router } from "express";
const router: Router = Router();
import asyncErrorHandler from "../../middleware/globalErrorHandler";
import SubjectController from "../../controller/subject.controller";
import student from "../../controller/student.controller";
router.get(
  "/student/:id/results/all",
  asyncErrorHandler(student.viewResultsYears)
);
router.get(
  "/student/:id/result/:year/:term",
  asyncErrorHandler(student.getSingleResult)
);
export default router;
