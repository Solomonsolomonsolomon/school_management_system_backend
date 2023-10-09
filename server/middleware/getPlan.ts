import { NextFunction, Request, Response } from "express";
import { Subscription } from "../model/database";
import { CustomError } from "./decorators";
export default async function getPlan(req: Request, res: Response) {
  let subscription = await Subscription.findOne({
    school: req.user?.school,
    schoolId: req.user?.schoolId,
  });
  if (!subscription) throw new CustomError({}, "no subscription Found..", 400);
  return subscription.plan;
}

export async function standardPlan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let plan = await getPlan(req, res);

  if (plan === "premium" || plan === "standard") {
    next();
  } else {
    throw new CustomError(
      {},
      "this feature is a higher plan than your current subscription.upgrade to use",
      400
    );
  }
}
export async function premiumPlan(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let plan = await getPlan(req, res);

  if (plan === "premium") {
    next();
  } else {
    throw new CustomError(
      {},
      "this is a premium feature.upgrade to premium to use",
      400
    );
  }
}
