import { CustomError } from "../middleware/decorators";
import { AcademicTerm, AcademicYear } from "../model/database";
import { Expense } from "../model/others/Expense";
import { Request as Req, Response as Res } from "express";
class ExpenseController {
  public async addExpense(req: Req, res: Res) {
    let term = await AcademicTerm.findOne({
      school: req.user?.school,
      schoolId: req.user?.schoolId,
      isCurrent: true,
    });
    let year = await AcademicYear.findOne({
      school: req.user?.school,
      schoolId: req.user?.schoolId,
      isCurrent: true,
    });
    await new Expense({
      amountPaid: req.body.amount,
      school: req.user?.school,
      schoolId: req.user?.schoolId,
      term,
      year,
      createdBy: req.user?._id,
      name: req.body?.name || "untitled expense",
    }).save();
    return res.status(201).json({
      msg: "expense added",
      status: 201,
    });
  }
  public async editExpense(req: Req, res: Res) {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) throw new CustomError({}, "expense not found", 404);
    let v = expense.__v;
    Object.assign(expense, req.body);
    expense.__v = v;
    await expense.save();
    return res.status(200).json({
      msg: "modified successfully",
      status: 200,
    });
  }
  public async deleteExpense(req: Req, res: Res) {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) throw new CustomError({}, "expense not found", 404);
    await expense.deleteOne();
    return res.status(200).json({
      msg: "modified successfully",
      status: 200,
    });
  }
  public async getExpenseCountMonthly(req: Req, res: Res) {
    interface Itotal {
      amount: number;
      month: number;
    }
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const completedTransactions = await Expense.find({
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
      msg: "total expense amount fetched successfully",
      label: months,
    });
  }
}

export default Object.freeze(new ExpenseController());
