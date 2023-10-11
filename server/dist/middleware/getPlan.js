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
exports.premiumPlan = exports.standardPlan = void 0;
const database_1 = require("../model/database");
const decorators_1 = require("./decorators");
function getPlan(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let subscription = yield database_1.Subscription.findOne({
            school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
            schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId,
        });
        if (!subscription)
            throw new decorators_1.CustomError({}, "no subscription Found..", 400);
        return subscription.plan;
    });
}
exports.default = getPlan;
function standardPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let plan = yield getPlan(req, res);
        if (plan === "premium" || plan === "standard") {
            next();
        }
        else {
            throw new decorators_1.CustomError({}, "this feature is a higher plan than your current subscription.upgrade to use", 400);
        }
    });
}
exports.standardPlan = standardPlan;
function premiumPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let plan = yield getPlan(req, res);
        if (plan === "premium") {
            next();
        }
        else {
            throw new decorators_1.CustomError({}, "this is a premium feature.upgrade to premium to use", 400);
        }
    });
}
exports.premiumPlan = premiumPlan;
