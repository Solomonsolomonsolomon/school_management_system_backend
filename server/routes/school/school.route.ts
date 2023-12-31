import { Router } from "express";
import SchoolController from "../../controller/school.controller";
const router: Router = Router();
import asyncErrorHandler from "../../utils/globalErrorHandler";

let school = new SchoolController();
router.get("/school/theme/current", asyncErrorHandler(school.getCurrentTheme));
router.get("/school/theme/default", asyncErrorHandler(school.getDefaultTheme));
router.post("/school/theme/set", asyncErrorHandler(school.changeTheme));
router.post("/school/logo/insert", asyncErrorHandler(school.insertLogo));
router.get("/school/logo/current", asyncErrorHandler(school.getLogo));
router.get("/school/logo/theme/get", asyncErrorHandler(school.logoAndThemes));
router.get("/school/get/gradePoint", asyncErrorHandler(school.getGradePoints));
router.put("/school/set/gradePoint", asyncErrorHandler(school.setGradePoints));
router.put("/school/add/gradepoint/", asyncErrorHandler(school.addGradePoints));
router.put(
  "/school/delete/gradepoint",
  asyncErrorHandler(school.deleteGradePoint)
);
router.get("/school/get/gradestyle", asyncErrorHandler(school.getGradeStyle));
router.put("/school/set/gradestyle", asyncErrorHandler(school.setGradeStyle));
export default router;
