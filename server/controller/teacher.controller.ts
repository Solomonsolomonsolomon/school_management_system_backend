import { Request, Response } from "express";
import { Teacher, Student } from "../model/database";

export async function getManagedStudents(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    let teacher = await Teacher.findOne({ _id });
    let formTeacher: string = teacher?.formTeacher
      ? teacher.formTeacher
      : "notAFormTeacher";
    console.log(formTeacher);
  } catch (error) {}
}
