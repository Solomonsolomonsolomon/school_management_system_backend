import { Router } from "express";
const router: Router = Router();

import bus from "./../../controller/bus.controller";

import asyncErrorHandler from "../../middleware/globalErrorHandler";
router.post("/bus/register/student", asyncErrorHandler(bus.registerForBus));
router.post(
  "/bus/register/school",
  asyncErrorHandler(bus.registerSchoolBusDetails)
);
router.post(
  "/bus/transaction/reset",
  asyncErrorHandler(bus.resetAllBusDetails)
);
router.post("/bus/pay/fees", asyncErrorHandler(bus.payBusFees));
router.put(
  "/bus/modify/schoolDetails",
  asyncErrorHandler(bus.editSchoolBusDetails)
);
router.put(
  "/bus/modify/student/details/:studentId",
  asyncErrorHandler(bus.editStudentBusDetails)
);
router.delete(
  "/bus/delete/:studentId",
  asyncErrorHandler(bus.deleteSingleStudent)
);
router.get("/bus/students/all", asyncErrorHandler(bus.getAllStudentsTakingBus));
export default router;
