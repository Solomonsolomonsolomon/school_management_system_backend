import { Router } from "express";
import {
  initializeTransaction,
  verifyPayment,
  subAccount,
  getBank,
  payWebHook,
} from "../../controller/payment.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
const paystackRouter: Router = Router();
paystackRouter.post("/paystack/pay", initializeTransaction);
paystackRouter.post("/paystack/verify", verifyPayment);
paystackRouter.post("/paystack/create/subaccount", subAccount);
paystackRouter.get("/paystack/get/bank", getBank);
paystackRouter.post("/paystack/webhook/url", asyncErrorHandler(payWebHook));
export default paystackRouter;
