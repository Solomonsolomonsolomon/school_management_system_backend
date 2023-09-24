import { Response, Request } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
import crypto from "crypto";
let secret = process.env.PAYSTACK_SECRET_KEY || "";
const paystack = (() => {
  function initializetransaction(res: Response, body: object | string) {
    return new Promise((resolve, reject) => {
      axios
        .post("https://api.paystack.co/transaction/initialize", body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        })
        .then((response: AxiosResponse) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          reject(err.message);
        });
    });
  }

  function verifyPayment(res: Response, ref: any) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.paystack.co/transaction/verify/${encodeURIComponent(
            ref
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
          }
        )
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((err: AxiosError) => {
          reject(err.message);
        });
    });
  }
  function getBank(res: Response, query: any) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.paystack.co/bank/`, {
          params: { ...query },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  function createSubAccount(res: Response, body: object | string) {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://api.paystack.co/subaccount`, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        })
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((err: AxiosError<object, any>) => {
          reject({ msg: err.message, ...err.response?.data });
        });
    });
  }
  function createWebhook(req: Request, res: Response) {
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      const event = req.body;
      console.log(event);
    }
    res.send("hhiiiiii");
  }
  return {
    initializetransaction,
    verifyPayment,
    getBank,
    createSubAccount,
    createWebhook,
  };
})();
export default paystack;
