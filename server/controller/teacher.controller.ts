import { NextFunction, Request, Response } from "express";
import { Teacher, Student } from "../model/database";
import asyncErrorHandler from "../middleware/globalErrorHandler";
console.log(asyncErrorHandler);

export function getManagedStudents(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  let manageStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { _id } = req.params;
    let teacher = await Teacher.findOne({ _id });
    let formTeacher: string = teacher?.formTeacher
      ? teacher.formTeacher
      : "notAFormTeacher";
    console.log(formTeacher);
    let student = await Student.find({ className: formTeacher });
    res.json(student);
  };
  manageStudents(req, res, next);
}
