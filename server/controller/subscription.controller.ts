import { Request, Response } from "express";
import { Subscription } from "../model/others/Subscription";
import { CustomError } from "../middleware/decorators";
class SubscriptionController {
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
    subscription.expiresAt = Date.now() / 1000 + 5670000;
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
    subscription.expiresAt = Date.now() / 1000 + 500;
    if (subscription.expiresAt <= Date.now() / 1000) {
      subscription.isActive = false;
      await subscription.save();
      throw new CustomError({}, "false", 400);
    }
    subscription.isActive = true;
    subscription.__v = v;
    await subscription.save();
    return res.status(200).json({
      msg: true,
      status: 200,
    });
  }
}

export default Object.freeze(new SubscriptionController());