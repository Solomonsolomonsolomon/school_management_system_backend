import { Router } from "express";

const router: Router = Router();
import {
  genResult,
  teacherGenerateResult,
} from "../../controller/results.controller";
router.get("/results/generate", genResult);
router.get("/result/teacher/generate/:id", teacherGenerateResult);
export default router;
