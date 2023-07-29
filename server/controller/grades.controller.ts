import { Request, Response } from "express";
import { Grades } from "../model/database";

export async function addGrades(req: Request, res: Response) {
  try {
    const { year, term, subjectId } = req.body;
    const { studentId } = req.params;
    let gradesObjectExists = await Grades.findOne({ studentId, year, term });
    if (!gradesObjectExists) {
      const newGradesObject = new Grades({
        studentId,
        year,
        term,
        grades: [req.body],
      });
      const grade = await newGradesObject.save();
      res.status(201).json({
        status: 201,
        msg: "Added grade successfully",
        grade,
      });
    } else {
      let subjectIndex = await gradesObjectExists.grades.findIndex((grades) => {
        console.log(grades.subjectId, subjectId);
        return grades.subjectId == subjectId;
      });
      console.log(subjectIndex);
      if (subjectIndex !== -1) {
        Object.assign(gradesObjectExists.grades[subjectIndex], {
          ...req.body,
        });
        return await gradesObjectExists.save().then((e) => {
          res.status(201).json({
            status: 201,
            msg: "Added grade successfully",
            grade: gradesObjectExists,
          });
        });
      }
      gradesObjectExists.grades.push(req.body);

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
