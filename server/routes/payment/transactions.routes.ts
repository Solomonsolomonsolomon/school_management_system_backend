import { Router } from "express";
import TransactionController from "../../controller/transactions.controller";
import asyncErrorHandler from "../../utils/globalErrorHandler";

const transaction = new TransactionController();
const transactionRouter: Router = Router();

transactionRouter.post(
  "/transaction/new",
  asyncErrorHandler(transaction.createTransaction)
);
transactionRouter.get(
  "/transaction/get/all",
  asyncErrorHandler(transaction.getAllTransactions)
);
transactionRouter.get(
  "/transaction/get/student/:_id",
  asyncErrorHandler(transaction.getTransactionsByStudent)
);
transactionRouter.get(
  "/transaction/get/total",
  asyncErrorHandler(transaction.getTotalAmountFromCompletedTransactions)
);
transactionRouter.get(
  "transaction/complete",
  asyncErrorHandler(transaction.getAllCompletedTransactions)
);
transactionRouter.get(
  "/transaction/monthly",
  asyncErrorHandler(transaction.getTotalAmountAndMonthPaid)
);
transactionRouter.get(
  "/transaction/ratio/earnings/expense",
  transaction.getRatioOfEarningsToExpense
);
export default transactionRouter;
