import express from "express";
import { Result, Student } from "../model/database";
import { CustomError } from "../middleware/decorators";
let instance: any;
class StudentController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  public async viewResultsYears(req: express.Request, res: express.Response) {
    let id = req.params.id;
    const student = await Student.findById(id);
    if (!student) throw new CustomError({}, "cant seem to find student", 500);
    let allResults = await Result.find({
      name: student.name,
      studentId: student.studentId,
    }).populate("year term");
    if (!allResults.length)
      throw new CustomError({}, "no result details found ", 404);
    let years = [];
    for (let i in allResults) {
      years.push({
        yearId: allResults[i].year?._id,
        termId: allResults[i].term?._id,
        yearName: allResults[i].year?.name,
        termName: allResults[i].term?.name,
      });
    }

    res.status(200).json({
      msg: "results years fetched successfully",
      years,
    });
  }
  public async getSingleResult(req: express.Request, res: express.Response) {
    let { id, year, term } = req.params;
    console.log(req.params);
    let result = await Result.findOne({
      term,
      year,
      id,
    }).populate("grades.subjectId");
    if (!result) throw new CustomError({}, "no result details found", 404);

    res.status(200).json({
      msg: "result ",
      status: 200,
      result,
      school: req.user?.school,
    });
  }
}

let student = Object.freeze(new StudentController());
export default student;
