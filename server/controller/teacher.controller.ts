import { NextFunction, Request, Response } from "express";
import {
  Teacher,
  Student,
  Grades,
  AcademicTerm,
  AcademicYear,
} from "../model/database";
import asyncErrorHandler from "../middleware/globalErrorHandler";
import { CustomError } from "../middleware/decorators";

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
  try {
    const { id } = req.params;
    const school = req.user?.school;
    const schoolId = req.user?.schoolId;
    const currentTerm = await AcademicTerm.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    const currentYear = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });

    // Find the teacher by ID
    const teacher = await Teacher.findOne({ school, _id: id }).populate(
      "subjects"
    );
    if (!teacher) {
      throw new CustomError({}, "Teacher doesn't exist", 404);
    }

    const subjects: any = teacher.subjects;

    // Find students taught by the teacher
    const studentsTaught = await Student.find({
      school,
      schoolId,
      subjects: { $in: subjects },
    })
      .select("name _id formTeacher email age className subjects")
      .populate("subjects");

    if (!studentsTaught.length) {
      throw new CustomError(
        {},
        "No students enrolled in subjects taught by you",
        404
      );
    }

    const studentsWithGrades = await Promise.all(
      studentsTaught.map(async (student) => {
        // Find the grades for each subject and student
        const grades = await Grades.findOne({
          studentId: student._id,
          year: currentYear,
          term: currentTerm,
          school,
          schoolId,
        });
        
        return {
          ...student.toObject(),
          grades: grades ? grades.grades : [],
        };
      })
    );

    // Format the response as needed
    const formattedResponse: Record<string, any[]> = {};

    subjects.forEach((subject: any) => {
      const studentsForSubject = studentsWithGrades.filter((student) =>
        student.subjects.some((subj: any) => subj.name === subject.name)
      );

      formattedResponse[subject.name] = studentsForSubject.map((student) => ({
        name: student.name,
        studentId: student._id,
        subjectId: subject._id,
        CA1: getGradeForSubject(student, subject, "CA1"),
        CA2: getGradeForSubject(student, subject, "CA2"),
        CA3: getGradeForSubject(student, subject, "CA3"),
        examScore: getGradeForSubject(student, subject, "examScore"),
      }));
    });

  

    res.status(200).json({
      msg: "Form Students",
      studentsTaught: formattedResponse,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      msg: "Failed to fetch data",
      error: error.message,
    });
  }
}

function getGradeForSubject(student: any, subject: any, exam: any) {
  const subjectGrades = student.grades.find((grade: any) =>
    grade.subjectId.equals(subject._id)
  );
  return subjectGrades ? subjectGrades[exam] : 0;
}
