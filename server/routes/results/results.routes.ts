import { Router } from "express";

const router: Router = Router();
import result from "./../../controller/results.controller";

import asyncErrorHandler from "../../utils/globalErrorHandler";
router.get("/results/generate", result.genResult);
router.get("/result/teacher/generate/:id", result.teacherGenerateResult);
router.delete("/result/delete/:id", asyncErrorHandler(result.DeleteResult));
export default router;
