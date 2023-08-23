import { Router } from "express";
const router: Router = Router();
import asyncErrorHandler from "../../middleware/globalErrorHandler";
import SubjectController from "../../controller/subject.controller";
let subject = new SubjectController();
router.get("/subject/get/all", asyncErrorHandler(subject.getAllSubjects));
router.post("/subject/add", asyncErrorHandler(subject.addSubjects));
router.post("/subject/edit/:id", asyncErrorHandler(subject.editSubjects));
router.delete("/subject/delete/:id", asyncErrorHandler(subject.deleteSubjects));
export default router;
