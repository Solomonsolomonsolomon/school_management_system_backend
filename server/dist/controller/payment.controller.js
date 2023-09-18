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
exports.payWebHook = exports.getBank = exports.subAccount = exports.initializeTransaction = exports.verifyPayment = void 0;
const paystack_config_1 = __importDefault(require("../middleware/paystack.config"));
const database_1 = require("../model/database");
const decorators_1 = require("../middleware/decorators");
//# initialize transaction
const initializeTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, amount } = req.body;
        if (!email || !amount) {
            throw new Error("enter email and amount");
        }
        let subaccount = yield database_1.School.findOne({ schoolId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.schoolId });
        if (!subaccount)
            throw new decorators_1.CustomError({}, "School hasn`t registered payment", 404);
        if (!subaccount.subaccount_code)
            throw new decorators_1.CustomError({}, "School hasn`t entered payment details", 404);
        const body = JSON.stringify({
            email,
            amount: amount * 100,
            subaccount: subaccount.subaccount_code,
            transaction_charge: 100 * 100,
            bearer: "subaccount",
        });
        yield paystack_config_1.default
            .initializetransaction(res, body)
            .then(({ data }) => {
            res.status(200).json({
                url: data.authorization_url,
                msg: "redirect your application to the url provided in the url method then hit /paystack/verify route in this api to verify payment",
                ref: data.reference,
            });
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message, error });
    }
});
exports.initializeTransaction = initializeTransaction;
//# verify payment
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { ref } = req.query;
        yield paystack_config_1.default
            .verifyPayment(res, ref)
            .then((data) => {
            res.status(200).json({ transaction_status: data.data.status });
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        return res.status(400).json({ message: error.message, error });
    }
});
exports.verifyPayment = verifyPayment;
const subAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        let body = req.body;
        console.log(req.body);
        let response = yield paystack_config_1.default.createSubAccount(res, Object.assign(Object.assign({}, body), { percentage_charge: 0.02 }));
        const bulkWriteOps = [];
        const filter = { schoolId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.schoolId };
        const replacement = Object.assign(Object.assign({ schoolId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.schoolId }, body), { subaccount_code: (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.subaccount_code });
        const updateOne = {
            updateOne: {
                filter,
                update: replacement,
                upsert: true, // Insert if not found
            },
        };
        bulkWriteOps.push(updateOne);
        yield database_1.School.bulkWrite(bulkWriteOps);
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json(Object.assign({}, err));
    }
});
exports.subAccount = subAccount;
const getBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = req.query;
        let simplifiedData = [];
        let response = yield paystack_config_1.default.getBank(res, query);
        for (const bank of response.data) {
            simplifiedData.push({
                name: bank.name,
                code: bank.code,
            });
        }
        res.status(200).json({
            status: 200,
            msg: "banks fetched successfully",
            banks: simplifiedData,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
});
exports.getBank = getBank;
const payWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield paystack_config_1.default.createWebhook(req, res);
});
exports.payWebHook = payWebHook;
