import { Result, Grades } from "../model/database";
import { Request, Response } from "express";

export async function genResult(req: Request, res: Response) {
  const { className } = req.params;
  try {
    // Use the $ sign to access properties of the nested field in the query
    const grades = await Grades.find({})
      .populate([
        { path: "studentId" },
        {
          path: "grades.subjectId",
        },
      ]) // Populates the subjectId field with the referenced Subject documents
      .exec();
    res.json(grades);
  } catch (error) {
    res.status(400).json(error);
  }
}
