import { Response } from "express";
import axios, { AxiosError, AxiosResponse } from "axios";
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
          resolve(response.data);
        })
        .catch((err: AxiosError) => {
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
  return {
    initializetransaction,
    verifyPayment,
  };
})();
export default paystack;
