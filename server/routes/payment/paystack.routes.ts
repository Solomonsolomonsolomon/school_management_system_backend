import { Router } from "express";
import {
  initializeTransaction,
  verifyPayment,
} from "../../controller/payment.controller";
const paystackRouter: Router = Router();
paystackRouter.post("/paystack/pay", initializeTransaction);
paystackRouter.post("/paystack/verify", verifyPayment);
export default paystackRouter;
