import { Router } from "express";
const router: Router = Router();
import asyncErrorHandler from "../../utils/globalErrorHandler";
import SubjectController from "../../controller/subject.controller";
let subject = new SubjectController();
router.get("/subject/get/all", asyncErrorHandler(subject.getAllSubjects));
router.post("/subject/add", asyncErrorHandler(subject.addSubjects));
router.post("/subject/edit/:id", asyncErrorHandler(subject.editSubjects));
router.delete("/subject/delete/:id", asyncErrorHandler(subject.deleteSubjects));
router.get(
  "/subject/get/all/json",
  asyncErrorHandler(subject.getAllSubjectsAsJson)
);
export default router;
