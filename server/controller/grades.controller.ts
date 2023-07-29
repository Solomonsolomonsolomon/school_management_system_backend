import { Request, Response } from "express";
import { Grades } from "../model/database";
import { Types } from "mongoose";
export async function addGrades(req: Request, res: Response) {
  try {
    const { year, term, subjectId } = req.body;
    const { studentId } = req.params;
    const studentID = new Types.ObjectId(studentId);
    const subjectID = new Types.ObjectId(subjectId);
    let gradesObjectExists = await Grades.findOne({ studentId, year, term });
    if (!gradesObjectExists) {
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
      let subjectIndex = await gradesObjectExists.grades.findIndex((grades) => {
        return grades.subjectId == subjectId;
      });

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
