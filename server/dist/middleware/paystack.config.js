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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../model/database");
let secret = process.env.PAYSTACK_SECRET_KEY || "";
const paystack = (() => {
    function initializetransaction(res, body) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .post("https://api.paystack.co/transaction/initialize", body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            })
                .then((response) => {
                resolve(response.data);
            })
                .catch((err) => {
                console.log(err);
                reject(err.message);
            });
        });
    }
    function verifyPayment(res, ref) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            })
                .then((response) => {
                resolve(response.data);
            })
                .catch((err) => {
                reject(err.message);
            });
        });
    }
    function getBank(res, query) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(`https://api.paystack.co/bank/`, {
                params: Object.assign({}, query),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            })
                .then((response) => {
                resolve(response.data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    function createSubAccount(res, body) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .post(`https://api.paystack.co/subaccount`, body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            })
                .then((response) => {
                resolve(response.data);
            })
                .catch((err) => {
                var _a;
                reject(Object.assign({ msg: err.message }, (_a = err.response) === null || _a === void 0 ? void 0 : _a.data));
            });
        });
    }
    function createWebhook(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const hash = crypto_1.default
                .createHmac("sha512", secret)
                .update(JSON.stringify(req.body))
                .digest("hex");
            if (hash == req.headers["x-paystack-signature"]) {
                const event = req.body;
                if (event.event === "charge.success") {
                    console.log("successful transaction");
                    let student = yield database_1.Student.findOne({
                        email: event.data.customer.email,
                    });
                    if (student) {
                        student.amount = ((_b = (_a = event.data) === null || _a === void 0 ? void 0 : _a.fees_split) === null || _b === void 0 ? void 0 : _b.subaccount) / 100;
                        yield student.save();
                        res.status(200).send(200);
                    }
                }
            }
        });
    }
    return {
        initializetransaction,
        verifyPayment,
        getBank,
        createSubAccount,
        createWebhook,
    };
})();
exports.default = paystack;
