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
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription_1 = require("../model/others/Subscription");
const decorators_1 = require("../middleware/decorators");
const database_1 = require("../model/database");
let instance;
class SubscriptionController {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    renewSubscription(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let subscription = yield Subscription_1.Subscription.findOne({
                school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
                schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
            });
            if (!subscription)
                throw new decorators_1.CustomError({}, "not found....you do not have a subscription", 404);
            let v = subscription.__v;
            subscription.expiresAt = Date.now() / 1000 + 1000;
            subscription.isActive = true;
            subscription.__v = v;
            yield subscription.save();
            return res.status(200).json({
                msg: 200,
                status: "renewed successfully",
            });
        });
    }
    getSubscriptionStatus(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let subscription = yield Subscription_1.Subscription.findOne({
                school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
                schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
            });
            if (!subscription)
                throw new decorators_1.CustomError({}, "not found....you do not have a subscription", 404);
            let v = subscription.__v;
            if (subscription.expiresAt <= Date.now() / 1000) {
                subscription.isActive = false;
                yield subscription.save();
                throw new decorators_1.CustomError({}, "false", 400);
            }
            subscription.isActive = true;
            subscription.__v = v;
            yield subscription.save();
        });
    }
    manualRenewal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { schoolId, timeInMinutes } = req.params;
            let subscription = yield Subscription_1.Subscription.findOne({ schoolId });
            if (!subscription)
                throw new decorators_1.CustomError({}, "not found....you do not have a subscription", 404);
            let v = subscription.__v;
            subscription.expiresAt = Date.now() / 1000 + +timeInMinutes * 60;
            subscription.isActive = true;
            subscription.__v = v;
            yield subscription.save();
            return res.status(200).json({
                msg: "subscription renewed",
                status: 200,
            });
        });
    }
    isEligibleForPlan(plan, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            let students = yield database_1.Student.countDocuments({ schoolId });
            let admin = yield database_1.Admin.countDocuments({ schoolId });
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
        });
    }
    getSubscriptionDetails(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let subscription = yield Subscription_1.Subscription.findOne({
                school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
                schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
            });
            if (!subscription)
                throw new decorators_1.CustomError({}, "not found....you do not have a subscription", 404);
            let expiry = new Date(subscription.expiresAt * 1000);
            res.status(200).json({
                msg: "subscription expiry date",
                status: 200,
                expiryDate: expiry,
                plan: subscription.plan,
            });
        });
    }
}
exports.default = Object.freeze(new SubscriptionController());
