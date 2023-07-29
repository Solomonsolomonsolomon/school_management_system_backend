import { Router } from "express";
const v1: Router = Router();
import secured from "./../../middleware/verifyjwt";
import adminRoutes from "./../admin/admin.routes";
import authRoutes from "./../auth/auth.routes";
import gradeRoutes from "./../grades/grades.routes";
import subjectRoutes from "./../subject/subject.routes";
v1.use(authRoutes);

v1.use(gradeRoutes);
v1.use(subjectRoutes);
v1.use(adminRoutes);

export default v1;
