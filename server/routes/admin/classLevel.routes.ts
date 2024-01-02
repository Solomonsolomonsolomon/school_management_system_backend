import asyncErrorHandler from "../../utils/globalErrorHandler";
import ClassLevelController from "../../controller/classLevel.controller";
let classLevel = new ClassLevelController();
let { createClassLevel } = classLevel;
import { Router } from "express";
const router: Router = Router();
router.post("/class/new", asyncErrorHandler(createClassLevel));
export default router;
