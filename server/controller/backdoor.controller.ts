import { CustomError } from "../middleware/decorators";
import { School, Admin, Subscription, Student } from "../model/database";
import { Request, Response } from "express";
import sub from "./subscription.controller";
export async function illegal(req: Request, res: Response) {
  let { username, password, email, school, plan } = req.params;
  let schoolAlreadyExists = !!(await School.countDocuments({ school }));
  console.log(schoolAlreadyExists);
  if (schoolAlreadyExists) {
    throw new CustomError({}, "cannot reregister", 400);
  }
  let admin = await Admin.findOne({ email, school });
  if (admin) throw new CustomError({}, "cannot reregister", 400);
  let newAdmin = new Admin({
    name: username,
    password,
    email,
    school,
  });

  let assignSubscriptionToStudents = new Subscription({
    isActive: true,
    expiresAt: Date.now() / 1000 + 300,
    plan,
    school: newAdmin.school,
    schoolId: newAdmin.schoolId,
  });

  await newAdmin.save();
  await assignSubscriptionToStudents
    .save()
    .then((e) => {
      res.json(newAdmin);
    })
    .catch((err) => {
      res.json(err);
    });
}
export async function manuallyassignsubscription(req: Request, res: Response) {
  const { schoolId, timeInMinutes, plan } = req.params;
  let subscription = await Subscription.findOne({ schoolId });
  if (!subscription)
    throw new CustomError(
      {},
      "not found....you do not have a subscription",
      404
    );
  let isEligible = await sub.isEligibleForPlan(plan, schoolId);
  if (!isEligible) {
    throw new CustomError(
      {},
      "School not eligible for plan,purchase higher plan",
      400
    );
  }
  let v = subscription.__v;
  subscription.expiresAt = Date.now() / 1000 + +timeInMinutes * 60;
  subscription.isActive = true;
  subscription.plan = plan;
  subscription.__v = v;

  await subscription.save();
  return res.status(200).json({
    msg: "subscription renewed",
    status: 200,
  });
}
export async function overideSubscription(req: Request, res: Response) {
  const { schoolId, timeInMinutes, plan } = req.params;
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
  subscription.plan = plan;
  subscription.__v = v;

  await subscription.save();
  return res.status(200).json({
    msg: "subscription renewed",
    status: 200,
  });
}


