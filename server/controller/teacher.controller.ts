import { NextFunction, Request, Response } from "express";
import { Teacher, Student } from "../model/database";
import asyncErrorHandler from "../middleware/globalErrorHandler";
import { CustomError } from "../middleware/decorators";
console.log(asyncErrorHandler);
export async function managedStudents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { _id } = req.params;
  let school = req.user?.school;
  let teacher = await Teacher.findOne({ _id }).select("formTeacher");
  if (!teacher)
    throw new CustomError(
      {},
      "teacher not found.either deleted or doesnt exist",
      404
    );
  let formTeacher = teacher.formTeacher;
  if (!formTeacher)
    throw new CustomError(
      {},
      "YOU are not a Form Teacher..if you are,please visit admin",
      404
    );

  let formStudents = await Student.find({
    className: formTeacher,
    school,
  }).select("name _id formTeacher school age className ");
  if (!formStudents.length)
    throw new CustomError(
      {},
      "NO students yet..When registered they will be assigned to you",
      404
    );

  let subjects = teacher.subjects;
  res.status(200).json({ status: 200, msg: "form students", formStudents });
}
