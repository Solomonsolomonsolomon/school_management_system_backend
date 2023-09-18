import { Router } from "express";
const router: Router = Router();
import { addGrades } from "./../../controller/grades.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
router.post("/grades/add/:studentId", asyncErrorHandler(addGrades));
export default router;
