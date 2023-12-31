import { payWebHook } from "../../controller/payment.controller";
import { Router } from "express";
import asyncErrorHandler from "../../utils/globalErrorHandler";
const router: Router = Router();
router.post("/paystack/webhook", asyncErrorHandler(payWebHook));
export default router;
