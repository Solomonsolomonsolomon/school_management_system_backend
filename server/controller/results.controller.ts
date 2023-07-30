import { Result, Grades } from "../model/database";
import { Request, Response } from "express";
import _, { Dictionary } from "lodash";

export async function calcResult(groupedData: Dictionary<any>) {
  for (let student in groupedData) {
    console.log(student[groupedData]);
  }
}
export async function genResult(req: Request, res: Response) {
  const { className } = req.params;
  try {
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
        $lookup: {
          from: "subjects",
          localField: "grades[subjectId]",
          foreignField: "_id",
          as: "subjectId",
        },
      },
    ])
      .exec()
      .then(async (result: any) => {
        // let groupedData;
        // for (let i in result) {
        //   let classname = `${result[i].studentId[0].currentClassLevel}${result[i].studentId[0].currentClassArm}`;

        //   groupedData = result.reduce((result: any, item: any) => {
        //     const { studentId, ...rest } = item;
        //     if (!result[classname]) {
        //       result[classname] = [];
        //     }
        //     result[classname].push(rest);
        //     return result;
        //   }, {});
        // }
        let groupedData = _.groupBy(result, (student) => {
          return `${student.studentId[0].currentClassLevel}${student.studentId[0].currentClassArm}`;
        });
        calcResult(groupedData);
        res.json(groupedData);
      });
  } catch (error: any) {
    res.status(400).json({
      error,
      err: error.message,
    });
  }
}
