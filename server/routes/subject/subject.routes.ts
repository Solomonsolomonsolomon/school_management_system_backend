import { Router } from "express";
const router: Router = Router();
import asyncErrorHandler from "../../middleware/globalErrorHandler";
import SubjectController from "../../controller/subject.controller";
let subject = new SubjectController();
router.post("/subject/add", asyncErrorHandler(subject.addSubjects));
router.post("/subject/edit", asyncErrorHandler(subject.editSubjects));
export default router;
