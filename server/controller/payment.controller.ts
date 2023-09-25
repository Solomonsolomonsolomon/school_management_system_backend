import { Request, Response } from "express";
import paystack from "../middleware/paystack.config";
import { School, ClassLevel } from "../model/database";
import { CustomError } from "../middleware/decorators";
//# initialize transaction
const initializeTransaction = async (req: Request, res: Response) => {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) {
      throw new Error("enter email and amount");
    }

    if (amount > req.user?.balance)
      throw new Error(`your balance is ${req.user?.balance} not ${amount}`);
    let subaccount = await School.findOne({ schoolId: req.user?.schoolId });
    if (!subaccount)
      throw new CustomError({}, "School hasn`t registered payment", 404);
    if (!subaccount.subaccount_code)
      throw new CustomError({}, "School hasn`t entered payment details", 404);
    const body = JSON.stringify({
      email,
      amount: amount * 100,
      subaccount: subaccount.subaccount_code,
      transaction_charge: 100 * 100,
      bearer: "subaccount",
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
    console.error(error);
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

const subAccount = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    console.log(req.body);
    let response: any = await paystack.createSubAccount(res, {
      ...body,
      percentage_charge: 0.02,
    });

    const bulkWriteOps = [];
    const filter = { schoolId: req.user?.schoolId };
    const replacement = {
      schoolId: req.user?.schoolId,
      ...body,
      subaccount_code: response?.data?.subaccount_code,
    };
    const updateOne = {
      updateOne: {
        filter,
        update: replacement,
        upsert: true, // Insert if not found
      },
    };
    bulkWriteOps.push(updateOne);
    await School.bulkWrite(bulkWriteOps);

    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ ...err });
  }
};

const getBank = async (req: Request, res: Response) => {
  try {
    let query = req.query;
    let simplifiedData: any[] = [];
    let response: any = await paystack.getBank(res, query);
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
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
const payWebHook = async (req: Request, res: Response) => {
  await paystack.createWebhook(req, res);
};
export {
  verifyPayment,
  initializeTransaction,
  subAccount,
  getBank,
  payWebHook,
};
