import { NextFunction, Request, Response } from "express";
import { Teacher, Student } from "../model/database";
import asyncErrorHandler from "../middleware/globalErrorHandler";
import { CustomError } from "../middleware/decorators";
console.log(asyncErrorHandler);
type GroupedStudents = {
  [className: string]: any[]; // The key is a class name, and the value is an array of students
};
export async function managedStudents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { _id } = req.params;
  let school = req.user?.school;
  let schoolId = req.user?.schoolId;
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
    schoolId,
  }).select(
    "name _id formTeacher school email age className studentId gender parent "
  );
  if (!formStudents.length)
    throw new CustomError(
      {},
      "NO students yet..When registered they will be assigned to you",
      404
    );
  res.status(200).json({
    status: 200,
    msg: "form students",
    formStudents,
    formTeacher: teacher?.formTeacher,
  });
}

export async function getStudentsTaught(req: Request, res: Response) {
  let { id } = req.params;
  let school = req.user?.school;
  let schoolId = req.user?.schoolId;
  let teacher = await Teacher.findOne({ school: req.user?.school, _id: id });
  if (!teacher) throw new CustomError({}, "teacher doesnt exist", 404);
  let subjects = teacher.subjects;
  let studentsTaught = await Student.find({
    school,
    schoolId,
    subjects: { $in: subjects }, // Filter students by subjects
  })
    .select("name _id formTeacher email age className subjects")
    .populate("subjects");
  console.log(studentsTaught);
  if (!studentsTaught.length)
    throw new CustomError(
      {},
      "No students enrolled in subjects taught by you",
      404
    );
  const studentsBySubject: Record<string, any[]> = {};

  studentsTaught.forEach((student) => {
    student.subjects?.forEach((subject: any) => {
      const subjectName = subject.name;

      if (!studentsBySubject[subjectName]) {
        studentsBySubject[subjectName] = [];
      }

      studentsBySubject[subjectName].push(student);
    });
  });

  console.log(studentsBySubject);

  // Group students by class name

  

  res.status(200).json({
    msg: "Form Students",
    studentsTaught: studentsBySubject,
  });
}
