import { Router } from "express";

const router: Router = Router();
import { attendance } from "../../controller/attendance.controller";
import asyncErrorHandler from "../../utils/globalErrorHandler";
router.get(
  "/attendance/get/:id/:className",
  asyncErrorHandler(attendance.getAttendanceDetails)
);
router.post(
  "/attendance/new/:id/:className",
  asyncErrorHandler(attendance.setAttendanceDetails)
);
router.put(
  "/attendance/edit/:id/:className",
  asyncErrorHandler(attendance.EditAttendanceDetails)
);
router.get(
  "/attendance/percentage/:id",
  asyncErrorHandler(attendance.getAttendancePercentage)
);
export default router;
