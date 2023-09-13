import { Router } from "express";
import {
  initializeTransaction,
  verifyPayment,
  subAccount,
  getBank,
} from "../../controller/payment.controller";
const paystackRouter: Router = Router();
paystackRouter.post("/paystack/pay", initializeTransaction);
paystackRouter.post("/paystack/verify", verifyPayment);
paystackRouter.post("/paystack/create/subaccount", subAccount);
paystackRouter.get("/paystack/get/bank", getBank);
export default paystackRouter;
