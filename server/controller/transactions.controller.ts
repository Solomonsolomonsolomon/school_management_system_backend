import { Request, Response } from "express";
import { CustomError } from "../middleware/decorators";
import { Transaction, Student } from "../model/database";

class TransactionController {
  constructor() {}
  createTransaction = async (req: Request, res: Response): Promise<any> => {
    const { payerId, amount } = req.body;
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    if (!payerId || !amount || isNaN(amount) || amount <= 0)
      throw new CustomError({}, "invalid transaction details", 400);
    const student = await Student.findById(payerId);
    if (!student) throw new CustomError({}, "student not found", 404);
    const transaction = new Transaction({
      payerId,
      amountPaid: amount,
      status: "pending", // Set the initial status to "pending"
      school,
      schoolId,
    });
    await transaction.save();
    return res.status(201).json({
      status: 201,
      msg: "Transaction created successfully",
      transaction,
    });
  };
  // Get all transactions
  getAllTransactions = async (req: Request, res: Response): Promise<any> => {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const transactions = await Transaction.find({ school, schoolId });
    if (!transactions.length)
      throw new CustomError({}, "no transactions found", 404);
    return res.status(200).json({ msg: "all transactions", transactions });
  };
  // Get transactions for a specific student
  getTransactionsByStudent = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { _id } = req.params;
    const transactions = await Transaction.find({ payerId: _id });
    res.status(200).json({
      msg: "completed transactions",
      status: 200,
      transactions: transactions,
    });
  };
  getAllCompletedTransactions = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const completedTransactions = await Transaction.find({
      status: "success",
      school,
      schoolId,
    });
    res.status(200).json({
      msg: "completed transactions",
      status: 200,
      transactions: completedTransactions,
    });
  };
  // Get total amount from all completed transactions
  getTotalAmountFromCompletedTransactions = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const completedTransactions = await Transaction.find({
      status: "success",
      school,
      schoolId,
    });
    // Calculate the total amount
    const totalAmount: number = completedTransactions.reduce(
      (sum, transaction) => sum + transaction.amountPaid,
      0
    );
    res.status(200).json({
      status: 200,
      msg: "total transaction amount fetched successfully",
      amount: totalAmount,
    });
  };
  getTotalAmountAndMonthPaid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    interface Itotal {
      amount: number;
      month: number;
    }
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const completedTransactions = await Transaction.find({
      status: "success",
      school,
      schoolId,
    });

    const totalAmount: Itotal[] = completedTransactions.reduce(
      (prev, current, i) => {
        return [
          ...prev,
          {
            amount: prev[i].amount + current.amountPaid,
            month: current.month,
          },
        ];
      },
      [{ amount: 0, month: 0 }]
    );
    let total = completedTransactions.reduce(
      (p: any, c) => {
        const { amountPaid, month } = c;
        const i = p.tracker.get(month);
        if (amountPaid) {
          if (i) {
            p.total[i].amount += amountPaid;
          } else {
            p.tracker.set(month, p.total.length);
            p.total.push({ month, amount: amountPaid });
          }
        } else {
          return p;
        }

        return p;
      },
      {
        total: [{ amount: 0, month: 0 }],
        tracker: new Map(),
      }
    ).total;
    console.log(total);
    let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i <= total.length - 1; i++) {
      months[total[i]?.month] = total[i]?.amount || 0;
      console.log(total[i]?.month);
    }

    res.status(200).json({
      status: 200,
      msg: "total transaction amount fetched successfully",
      label: months,
    });
  };
}
export default TransactionController;
