import { NextFunction, Request, Response } from "express";
import { Teacher, Student } from "../model/database";
import asyncErrorHandler from "../middleware/globalErrorHandler";
console.log(asyncErrorHandler);
export async function getManagedStudents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { _id } = req.params;
  let formStudents: any = [];
  let teacher = await Teacher.findOne({ _id });
}