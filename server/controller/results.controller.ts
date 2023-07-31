import { Result, Grades } from "../model/database";
import { Request, Response } from "express";
import _, { Dictionary } from "lodash";

export async function calcResult(groupedData: Dictionary<any>) {
  for (const className in groupedData) {
    const students = groupedData[className];
    for (const student of students) {
      const totalMarks = _.sumBy(student.grades, "total");
      const averageMarks = totalMarks / student.grades.length;
      let overallGrade = "";
      if (averageMarks >= 75) {
        overallGrade = "A";
      } else if (averageMarks >= 60) {
        overallGrade = "B";
      } else if (averageMarks >= 50) {
        overallGrade = "C";
      } else if (averageMarks >= 40) {
        overallGrade = "D";
      } else {
        overallGrade = "F";
      }
      student.totalMarks = totalMarks;
      student.averageMarks = averageMarks;
      student.overallGrade = overallGrade;
    }
    students.sort((a: any, b: any) => b.totalMarks - a.totalMarks);
    for (let i = 0; i < students.length; i++) {
      students[i].position = i + 1;
    }
  }
  return groupedData;
}

export async function genResult(req: Request, res: Response) {
  try {
    let term = req.query.term;
    let year = req.query.year;
    let gradesPipeline = await Grades.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "studentId",
        },
      },
      {
        $unwind: "$studentId",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "grades.subjectId",
          foreignField: "_id",
          as: "subjectId",
        },
      },
      {
        $match: {
          $and: [{ term }, { year }],
        },
      },
    ]).exec();

    let groupedData = _.groupBy(gradesPipeline, (student) => {
      return `${student.studentId.currentClassLevel}${student.studentId.currentClassArm}`;
    });

    let results = await calcResult(groupedData);
    res.json(results);
  } catch (error: any) {
    res.status(400).json({
      error,
      err: error.message,
    });
  }
}
