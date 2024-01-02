import { Router } from "express";
const router: Router = Router();
import grade from "./../../controller/grades.controller";
import asyncErrorHandler from "../../utils/globalErrorHandler";
router.post("/grades/add/:studentId", asyncErrorHandler(grade.addGrades));
router.delete(
  "/grades/delete/:id/:className",
  asyncErrorHandler(grade.deleteGrades)
);
export default router;
