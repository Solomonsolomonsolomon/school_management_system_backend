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
import classlevel from "./../admin/classLevel.routes";
import asyncErrorHandler, {
  ErrorHandler,
} from "../../middleware/globalErrorHandler";
import paymentRouter from "../payment/payment.routes";
import transactionRouter from "../payment/transactions.routes";
import schoolRouter from "../school/school.route";
import webHookRouter from "../payment/webhook.routes";
import attendanceRouter from "../attendance/attendance.routes";
import studentRoutes from "../student/student.routes";
import expenseRoutes from "./../payment/expense.routes";
import verifySubscription from "./../../middleware/verifySubscription";
import subscriptionRoutes from "./../subscription/subscription.routes";
import busRoutes from "../bus/bus.routes";
import { premiumPlan, standardPlan } from "../../middleware/getPlan";
v1.use(authRoutes);
v1.use(webHookRouter);
v1.use(secured, subscriptionRoutes);
v1.use(secured, currentTermAndYear);
v1.use(asyncErrorHandler(verifySubscription));
v1.use(secured, gradeRoutes);
v1.use(secured, subjectRoutes);
v1.use(secured, resultRoutes);
v1.use(secured, classlevel);
v1.use(secured, teacherRoutes);
v1.use(secured, adminRoutes);
v1.use(secured, paymentRouter);
v1.use(secured, transactionRouter);
v1.use(secured, schoolRouter);
v1.use(secured, attendanceRouter);

v1.use(studentRoutes);
//standard plans
v1.use(asyncErrorHandler(standardPlan));
v1.use(secured, expenseRoutes);
//premium plans
v1.use(asyncErrorHandler(premiumPlan));
v1.use(secured, busRoutes);
export default v1;
