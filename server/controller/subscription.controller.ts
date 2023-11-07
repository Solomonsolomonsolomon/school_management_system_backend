import { Request, Response } from "express";
import { Subscription } from "../model/others/Subscription";
import { CustomError } from "../middleware/decorators";
import { Admin, Student } from "../model/database";
let instance: any;
class SubscriptionController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public async renewSubscription(req: Request, res: Response) {
    let subscription = await Subscription.findOne({
      school: req.user?.school,
      schoolId: req.user?.schoolId,
    });
    if (!subscription)
      throw new CustomError(
        {},
        "not found....you do not have a subscription",
        404
      );
    let v = subscription.__v;
    subscription.expiresAt = Date.now() / 1000 + 1000;
    subscription.isActive = true;
    subscription.__v = v;

    await subscription.save();
    return res.status(200).json({
      msg: 200,
      status: "renewed successfully",
    });
  }
  public async getSubscriptionStatus(req: Request, res: Response) {
    let subscription = await Subscription.findOne({
      school: req.user?.school,
      schoolId: req.user?.schoolId,
    });

    if (!subscription)
      throw new CustomError(
        {},
        "not found....you do not have a subscription",
        404
      );
    let v = subscription.__v;
    if (subscription.expiresAt <= Date.now() / 1000) {
      subscription.isActive = false;
      await subscription.save();
      throw new CustomError({}, "false", 400);
    }
    subscription.isActive = true;
    subscription.__v = v;
    await subscription.save();
  }

  public async manualRenewal(req: Request, res: Response) {
    interface manualRenewal {
      schoolId: string;
      timeInMinutes: number;
    }
    const { schoolId, timeInMinutes } = req.params;
    let subscription = await Subscription.findOne({ schoolId });
    if (!subscription)
      throw new CustomError(
        {},
        "not found....you do not have a subscription",
        404
      );
    let v = subscription.__v;
    subscription.expiresAt = Date.now() / 1000 + +timeInMinutes * 60;
    subscription.isActive = true;
    subscription.__v = v;

    await subscription.save();
    return res.status(200).json({
      msg: "subscription renewed",
      status: 200,
    });
  }

  public async isEligibleForPlan(plan: string, schoolId: string) {
    let students = await Student.countDocuments({ schoolId });
    let admin = await Admin.countDocuments({ schoolId });
    if (plan === "basic" && students <= 299 && admin <= 5) {
      return true;
    }
    if (plan === "standard" && students <= 399 && admin <= 10) {
      return true;
    }
    if (plan === "premium") {
      return true;
    }
    return false;
  }

  public async getSubscriptionDetails(req: Request, res: Response) {
    let subscription = await Subscription.findOne({
      school: req.user?.school,
      schoolId: req.user?.schoolId,
    });

    if (!subscription)
      throw new CustomError(
        {},
        "not found....you do not have a subscription",
        404
      );
    let expiry = new Date(subscription.expiresAt * 1000);
    res.status(200).json({
      msg: "subscription expiry date",
      status: 200,
      expiryDate: expiry,
      plan: subscription.plan,
    });
  }
}

export default Object.freeze(new SubscriptionController());
