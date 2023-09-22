import paystack from "../middleware/paystack.config";
import { Request, Response } from "express";
const payWebHook = async (req: Request, res: Response) => {
  await paystack.createWebhook(req, res);
};

export { payWebHook };
