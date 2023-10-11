"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overideSubscription = exports.manuallyassignsubscription = exports.illegal = void 0;
const decorators_1 = require("../middleware/decorators");
const database_1 = require("../model/database");
const subscription_controller_1 = __importDefault(require("./subscription.controller"));
function illegal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password, email, school, plan } = req.params;
        let schoolAlreadyExists = !!(yield database_1.School.countDocuments({ school }));
        console.log(schoolAlreadyExists);
        if (schoolAlreadyExists) {
            throw new decorators_1.CustomError({}, "cannot reregister", 400);
        }
        let admin = yield database_1.Admin.findOne({ email, school });
        if (admin)
            throw new decorators_1.CustomError({}, "cannot reregister", 400);
        let newAdmin = new database_1.Admin({
            name: username,
            password,
            email,
            school,
        });
        let assignSubscriptionToStudents = new database_1.Subscription({
            isActive: true,
            expiresAt: Date.now() / 1000 + 300,
            plan,
            school: newAdmin.school,
            schoolId: newAdmin.schoolId,
        });
        yield newAdmin.save();
        yield assignSubscriptionToStudents
            .save()
            .then((e) => {
            res.json(newAdmin);
        })
            .catch((err) => {
            res.json(err);
        });
    });
}
exports.illegal = illegal;
function manuallyassignsubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { schoolId, timeInMinutes, plan } = req.params;
        let subscription = yield database_1.Subscription.findOne({ schoolId });
        if (!subscription)
            throw new decorators_1.CustomError({}, "not found....you do not have a subscription", 404);
        let isEligible = yield subscription_controller_1.default.isEligibleForPlan(plan, schoolId);
        if (!isEligible) {
            throw new decorators_1.CustomError({}, "School not eligible for plan,purchase higher plan", 400);
        }
        let v = subscription.__v;
        subscription.expiresAt = Date.now() / 1000 + +timeInMinutes * 60;
        subscription.isActive = true;
        subscription.plan = plan;
        subscription.__v = v;
        yield subscription.save();
        return res.status(200).json({
            msg: "subscription renewed",
            status: 200,
        });
    });
}
exports.manuallyassignsubscription = manuallyassignsubscription;
function overideSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { schoolId, timeInMinutes, plan } = req.params;
        let subscription = yield database_1.Subscription.findOne({ schoolId });
        if (!subscription)
            throw new decorators_1.CustomError({}, "not found....you do not have a subscription", 404);
        let v = subscription.__v;
        subscription.expiresAt = Date.now() / 1000 + +timeInMinutes * 60;
        subscription.isActive = true;
        subscription.plan = plan;
        subscription.__v = v;
        yield subscription.save();
        return res.status(200).json({
            msg: "subscription renewed",
            status: 200,
        });
    });
}
exports.overideSubscription = overideSubscription;
