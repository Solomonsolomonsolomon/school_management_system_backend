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
let instance: any;
class GradeController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public async addGrades(req: Request, res: Response) {
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
      let isValidStudentId = !!(await Student.countDocuments({
        _id: studentID,
      }));
      let isValidSubjectId = !!(await Subject.countDocuments({
        _id: subjectID,
      }));
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
        let subjectIndex = await gradesObjectExists.grades.findIndex(
          (grades) => {
            return grades.subjectId == subjectId;
          }
        );

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
  public async deleteGrades(req: Request, res: Response) {
    let { id, className } = req.params;
    const school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let currentYear = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let currentTerm = await AcademicTerm.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let student = await Student.findOne({ studentId: id });
    console.log("year", currentYear, "term:", currentTerm);
    if (!currentTerm || !currentYear)
      throw new CustomError(
        {},
        "either current term or current term not set",
        400
      );
    // console.log(,"6512473a6402d7f6a807af3b", student?._id,);
    if (!student) throw new CustomError({}, "Student not found ", 400);
    let grade = await Grades.findOneAndDelete({
      school,
      schoolId,
      year: currentYear?._id,
      term: currentTerm?._id,
      studentId: student._id,
      className,
    });
    if (!grade)
      throw new CustomError(
        {},
        "Grade not found student for class provided",
        404
      );
    return res.status(200).json({
      msg: "successful deletion ",
      status: 200,
    });
  }
}

export default Object.freeze(new GradeController());
