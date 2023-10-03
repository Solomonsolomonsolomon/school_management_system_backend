import { Router } from "express";
const router: Router = Router();
import expense from "./../../controller/expense.controller";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
router.post("/expense/new", asyncErrorHandler(expense.addExpense));
router.get(
  "/expense/monthly",
  asyncErrorHandler(expense.getExpenseCountMonthly)
);
export default router;
