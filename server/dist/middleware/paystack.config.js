"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
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
    return {
        initializetransaction,
        verifyPayment,
        getBank,
        createSubAccount,
    };
})();
exports.default = paystack;
