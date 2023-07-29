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
      let subjectIndex = gradesObjectExists.grades.findIndex((grades) => {
        return grades.subjectId === subjectId;
      });
      if (subjectIndex !== -1) {
        Object.assign(gradesObjectExists.grades[subjectId], {
          ...req.body,
        });
        return await gradesObjectExists.save();
      }
      gradesObjectExists.grades.push(req.body);

      // Save the updated gradesObject to the database
      await gradesObjectExists.save();

      // Send the response with the updated gradesObject
      res.status(201).json({
        status: 201,
        msg: "Added grade successfully",
        grade: gradesObjectExists,
      });
    }
  } catch (error: any) {
    // Handle any errors that occur during the process
    res.status(400).json({
      status: 400,
      msg: "Failed to add grade",
      error: error.message,
    });
  }
}
