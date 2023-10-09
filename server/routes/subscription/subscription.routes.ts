import { Router } from "express";
const router: Router = Router();
import asyncErrorHandler from "../../middleware/globalErrorHandler";
import subscription from "../../controller/subscription.controller";
import student from "../../controller/student.controller";
router.get(
  "/subscription/details",
  asyncErrorHandler(subscription.getSubscriptionDetails)
);

export default router;
