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
    const { year, term, subjectId } = req.body;
    const { studentId } = req.params;
    const studentID = new Types.ObjectId(studentId);
    const subjectID = new Types.ObjectId(subjectId);

    let currentTerm = !!(await AcademicTerm.countDocuments({ name: term }));
    let currentYear = !!(await AcademicYear.countDocuments({ name: year }));
    let isValidStudentId = !!(await Student.countDocuments({ _id: studentID }));
    let isValidSubjectId = !!(await Subject.countDocuments({ _id: subjectID }));

    if (!currentYear) throw new Error(" year entered not valid");
    if (!currentTerm) throw new Error("term entered not valid");
    if (!isValidStudentId) throw new Error("enter valid studentId");
    if (!isValidSubjectId) throw new Error("enter valid subjectId");
    let gradesObjectExists = await Grades.findOne({ studentId, year, term });

    //if grade object doesnt exist
    if (!gradesObjectExists) {
      //create new grade
      const newGradesObject = new Grades({
        studentId: studentID,
        year,
        term,
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
