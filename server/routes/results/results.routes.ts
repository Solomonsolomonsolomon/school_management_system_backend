import { Router } from "express";

const router: Router = Router();
import {
  genResult,
  teacherGenerateResult,
  DeleteResult,
} from "../../controller/results.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
router.get("/results/generate", genResult);
router.get("/result/teacher/generate/:id", teacherGenerateResult);
router.delete("/result/delete/:id", asyncErrorHandler(DeleteResult));
export default router;
