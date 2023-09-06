import { Router } from "express";
const v1: Router = Router();
import secured from "./../../middleware/verifyjwt";
import adminRoutes from "./../admin/admin.routes";
import authRoutes from "./../auth/auth.routes";
import gradeRoutes from "./../grades/grades.routes";
import subjectRoutes from "./../subject/subject.routes";
import resultRoutes from "../results/results.routes";
import teacherRoutes from "./../teacher/teacher.routes";
import currentTermAndYear from "./../admin/currentTermAndYear.routes";
import { ErrorHandler } from "../../middleware/globalErrorHandler";

v1.use(authRoutes);
v1.use(secured,currentTermAndYear);
v1.use(gradeRoutes);
v1.use(secured, subjectRoutes);
v1.use(resultRoutes);
v1.use(secured,teacherRoutes);
v1.use(secured, adminRoutes);

export default v1;
