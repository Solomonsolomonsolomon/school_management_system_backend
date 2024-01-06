import { Router } from "express";
const router: Router = Router();
import asyncErrorHandler from "../../utils/globalErrorHandler";
import subscription from "../../controller/subscription.controller";

router.get(
  "/subscription/details",
  asyncErrorHandler(subscription.getSubscriptionDetails)
);
router.get(
  "/subscription/check/active",
  asyncErrorHandler(subscription.isSubscriptionActive)
);

export default router;
