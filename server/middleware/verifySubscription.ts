import { Subscription } from "../model/others/Subscription";
import subscription from "./../controller/subscription.controller";

import { Request, Response, NextFunction } from "express";

export default async function verifySubscription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await subscription.getSubscriptionStatus(req, res);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("subscription expired..renew");
  }
}
