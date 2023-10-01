import { Request, Response } from "express";
import {
  AcademicTerm,
  Grades,
  Student,
  Subject,
  AcademicYear,
} from "../model/database";
import { Types } from "mongoose";
import { CustomError } from "../middleware/decorators";
export async function addGrades(req: Request, res: Response) {
  try {
    const { subjectId } = req.body;
    const { CA1, CA2, CA3, examScore } = req.body;
    const school = req.user?.school;
    const schoolId = req.user?.schoolId;
    const { studentId } = req.params;
    const studentID = new Types.ObjectId(studentId);
    const subjectID = new Types.ObjectId(subjectId);
    const className = await Student.findById(studentID);

    let currentTerm = await AcademicTerm.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let currentYear = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let isValidStudentId = !!(await Student.countDocuments({ _id: studentID }));
    let isValidSubjectId = !!(await Subject.countDocuments({ _id: subjectID }));
    if (!currentYear)
      throw new Error(" no current year set.please visit admin to set");
    if (!currentTerm)
      throw new Error("no current term found.please contact admin to set");
    if (!isValidStudentId) throw new Error("enter valid studentId");
    if (!isValidSubjectId) throw new Error("enter valid subjectId");
    let gradesObjectExists = await Grades.findOne({
      studentId,
      year: currentYear,
      term: currentTerm,
      className: className?.className,
      school,
      schoolId,
    });

    //if grade object doesnt exist
    if (!gradesObjectExists) {
      //create new grade
      const newGradesObject = new Grades({
        studentId: studentID,
        className: className?.className,
        year: currentYear,
        term: currentTerm,
        school,
        schoolId,
        grades: [{ ...req.body, studentId: studentID, subjectId: subjectID }],
      });
      const grade = await newGradesObject.save();
      res.status(201).json({
        status: 201,
        msg: "Added grade successfully",
        grade,
      });
    } else {
      //if grades object exists
      let subjectIndex = await gradesObjectExists.grades.findIndex((grades) => {
        return grades.subjectId == subjectId;
      });

      //if subject already added for grade,edit
      if (subjectIndex !== -1) {
        Object.assign(gradesObjectExists.grades[subjectIndex], {
          ...req.body,
          subjectId: subjectID,
          studentId: studentID,
        });
        return await gradesObjectExists.save().then((e) => {
          res.status(201).json({
            status: 201,
            msg: "Added grade successfully",
            grade: gradesObjectExists,
          });
        });
      }

      //else push new subject
      gradesObjectExists.grades.push({
        ...req.body,
        studentId: studentID,
        subjectId: subjectID,
      });
      await gradesObjectExists.save();
      res.status(201).json({
        status: 201,
        msg: "Added grade successfully",
        grade: gradesObjectExists,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      msg: "Failed to add grade",
      error: error.message,
    });
  }
}
