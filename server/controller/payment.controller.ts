import { Request, Response } from "express";
import paystack from "../middleware/paystack.config";
//# initialize transaction
const initializeTransaction = async (req: Request, res: Response) => {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) {
      throw new Error("enter email and amount");
    }
    const body = JSON.stringify({
      email,
      amount: amount * 100,
    });

    await paystack
      .initializetransaction(res, body)
      .then(({ data }: any) => {
        res.status(200).json({
          url: data.authorization_url,
          msg: "redirect your application to the url provided in the url method then hit /paystack/verify route in this api to verify payment",
          ref: data.reference,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, error });
  }
};
//# verify payment
const verifyPayment = async (req: Request, res: Response) => {
  try {
    let { ref }: any = req.query;
    await paystack
      .verifyPayment(res, ref)
      .then((data: any) => {
        res.status(200).json({ transaction_status: data.data.status });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, error });
  }
};
export { verifyPayment, initializeTransaction };
