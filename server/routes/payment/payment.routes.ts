import { Router } from "express";

const paymentRouter: Router = Router();
import paystackRouter from "./paystack.routes";
paymentRouter.use(paystackRouter);
export default paymentRouter;
