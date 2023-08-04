import { Router } from "express";
const router: Router = Router();
import { addGrades } from "./../../controller/grades.controller";

router.post("/grades/add/:studentId", addGrades);
export default router;
