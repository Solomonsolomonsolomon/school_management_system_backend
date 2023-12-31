import {
  Result,
  Grades,
  AcademicTerm,
  AcademicYear,
  Student,
  Teacher,
  School,
  ClassLevel,
} from "../model/database";
import { Request, Response } from "express";
import _, { Dictionary, result } from "lodash";
import { CustomError } from "../utils/globalErrorHandler";
import { previewClassResults } from "./teacher.controller";
import student from "./student.controller";
import { ISchool } from "../model/others/School";

let instance: any = null;
class ResultController {
  constructor() {
    this.DeleteResult = this.DeleteResult.bind(this);
    this.autoPromote = this.autoPromote.bind(this);
    this.genResult = this.genResult.bind(this);
    this.teacherGenerateResult = this.teacherGenerateResult.bind(this);
    this.calcResult = this.calcResult.bind(this);
    this.calcResultAndCummulative = this.calcResultAndCummulative.bind(this);
    this.calcResultAndCummulativeAndAutoPromote =
      this.calcResultAndCummulativeAndAutoPromote.bind(this);
    if (instance) return instance;
    instance = this;
  }

  private async calcResult(
    groupedData: Dictionary<any>,
    school: string,
    schoolId: string
  ) {
    let _school = await School.findOne({ school, schoolId });
    _school?.toObject({ getters: true, virtuals: false });
    if (!_school)
      throw new CustomError({}, "school details not on record", 404);
    let bulkPushOperations: any[] = [];

    for (const className in groupedData) {
      const students = groupedData[className];

      for (const student of students) {
        let validGrades = 0;
        let totalMarks = 0;
        for (let i of student.grades) {
          if (
            i.CA1 !== null ||
            i.CA2 !== null ||
            i.CA3 !== null ||
            i.examScore !== null
          )
            validGrades++;
        }
        totalMarks = validGrades ? _.sumBy(student.grades, "total") : 0;

        const averageMarks = validGrades ? totalMarks / validGrades : -1;

        // let overallGrade = "";
        // if (averageMarks === -1) {
        //   overallGrade = "N/A";
        // }
        // if (averageMarks >= (_school?.gradePoints?.A || 75)) {
        //   overallGrade = "A";
        // } else if (averageMarks >= (_school?.gradePoints?.B || 60)) {
        //   overallGrade = "B";
        // } else if (averageMarks >= (_school?.gradePoints?.C || 50)) {
        //   overallGrade = "C";
        // } else if (averageMarks >= (_school?.gradePoints?.D || 40)) {
        //   overallGrade = "D";
        // } else {
        //   overallGrade = "F";
        // }

        let overallGrade = this.calculateOverallGrade(averageMarks, _school);
        student.totalMarks = totalMarks;
        student.averageMarks = averageMarks;
        student.overallGrade = overallGrade;
      }
      students.sort((a: any, b: any) => b.totalMarks - a.totalMarks);
      for (let i = 0; i < students.length; i++) {
        students[i].position = i + 1;
        let resultMetaData = {
          name: students[i].studentId.name,
          studentId: students[i].studentId.studentId,
          id: students[i].studentId._id,
          totalScore: students[i].totalMarks,
          year: students[i].year,
          school: students[i].school,
          schoolId: students[i].schoolId,
          term: students[i].term,
          position: students[i].position,
          class: `${students[i].studentId.currentClassLevel}${students[i].studentId.currentClassArm}`,
          overallGrade: students[i].overallGrade,
          average: students[i].averageMarks,
          grades: students[i].grades,
          status:
            students[i].overallGrade == "F" || "F9" || "F_m"
              ? "failed"
              : "passed",
        };

        bulkPushOperations.push({
          updateOne: {
            filter: {
              id: students[i].studentId._id,
              term: students[i].term,
              year: students[i].year,
            },
            update: { $set: resultMetaData },
            upsert: true,
          },
        });
      }
    }

    await Result.bulkWrite(bulkPushOperations);
    return groupedData;
  }
  private async calcResultAndCummulative(
    groupedData: Dictionary<any>,
    school: any,
    year: any,
    schoolId: any,
    teacher: any
  ) {
    let bulkPushOperations: any = [];
    let _school = await School.findOne({ school, schoolId });
    if (!_school) throw new CustomError({}, "school details not found", 404);
    for (const className in groupedData) {
      const students = groupedData[className];
      for (const student of students) {
        let validGrades = 0;
        let totalMarks = 0;
        for (let i of student.grades) {
          if (
            i.CA1 !== null ||
            i.CA2 !== null ||
            i.CA3 !== null ||
            i.examScore !== null
          )
            validGrades++;
        }
        totalMarks = validGrades ? _.sumBy(student.grades, "total") : 0;

        const averageMarks = validGrades ? totalMarks / validGrades : -1;

        // let overallGrade = "";
        // if (averageMarks === -1) {
        //   overallGrade = "N/A";
        // }
        // if (averageMarks >= (_school?.gradePoints?.A || 75)) {
        //   overallGrade = "A";
        // } else if (averageMarks >= (_school?.gradePoints?.B || 60)) {
        //   overallGrade = "B";
        // } else if (averageMarks >= (_school?.gradePoints?.C || 50)) {
        //   overallGrade = "C";
        // } else if (averageMarks >= (_school?.gradePoints?.D || 40)) {
        //   overallGrade = "D";
        // } else {
        //   overallGrade = "F";
        // }

        let overallGrade = this.calculateOverallGrade(averageMarks, _school);
        student.totalMarks = totalMarks;
        student.averageMarks = averageMarks;
        student.overallGrade = overallGrade;
      }
      students.sort((a: any, b: any) => b.totalMarks - a.totalMarks);
      for (let i = 0; i < students.length; i++) {
        students[i].position = i + 1;
        let resultMetaData = {
          name: students[i].studentId.name,
          studentId: students[i].studentId.studentId,
          id: students[i].studentId._id,
          totalScore: students[i].totalMarks,
          year: students[i].year,
          school: students[i].school,
          schoolId: students[i].schoolId,
          term: students[i].term,
          position: students[i].position,
          class: `${students[i].studentId.currentClassLevel}${students[i].studentId.currentClassArm}`,
          overallGrade: students[i].overallGrade,
          average: students[i].averageMarks,
          grades: students[i].grades,
          status: students[i].overallGrade == "F" ? "failed" : "passed",
        };

        bulkPushOperations.push({
          updateOne: {
            filter: {
              id: students[i].studentId._id,
              term: students[i].term,
              year: students[i].year,
            },
            update: { $set: resultMetaData },
            upsert: true,
          },
        });
      }
    }

    await Result.bulkWrite(bulkPushOperations);
    let allTerms = await Result.find({
      year,
      schoolId: schoolId,
      class: teacher?.formTeacher || "not a form teacher",
    });
    interface subP {
      totalScore: number;
      studentId: string;
      name: string;
      average: any;
    }
    interface P {
      student: subP[];
      tracker: Map<string, number>;
    }

    let cummulativeScore: subP[] = allTerms.reduce(
      (p: P, c) => {
        const { totalScore, studentId, name, average } = c;
        const i = p.tracker.get(studentId);
        if (totalScore) {
          if (i) {
            p.student[i].totalScore += totalScore;
          } else {
            p.tracker.set(studentId, p.student.length);
            p.student.push({ studentId, totalScore, name, average });
          }
        } else {
          return p;
        }

        return p;
      },
      {
        student: [{ totalScore: 0, studentId: "", name: "", average: 0 }],
        tracker: new Map(),
      }
    ).student;
    cummulativeScore.shift();
    return { groupedData, cummulativeScore };
  }

  private async calcResultAndCummulativeAndAutoPromote(
    groupedData: Dictionary<any>,
    school: any,
    year: any,
    schoolId: any,
    teacher: any,
    promotionClasses: any[]
  ) {
    let bulkPushOperations: any = [];
    let studentBulkOperations: any[] = [];
    let _school = await School.findOne({ school, schoolId });
    if (!_school) throw new CustomError({}, "", 404);
    for (const className in groupedData) {
      const students = groupedData[className];
      for (const student of students) {
        let validGrades = 0;
        let totalMarks = 0;
        for (let i of student.grades) {
          if (
            i.CA1 !== null ||
            i.CA2 !== null ||
            i.CA3 !== null ||
            i.examScore !== null
          )
            validGrades++;
        }
        totalMarks = validGrades ? _.sumBy(student.grades, "total") : 0;

        const averageMarks = validGrades ? totalMarks / validGrades : -1;

        let overallGrade = this.calculateOverallGrade(averageMarks, _school);
        student.totalMarks = totalMarks;
        student.averageMarks = averageMarks;
        student.overallGrade = overallGrade;
      }
      students.sort((a: any, b: any) => b.totalMarks - a.totalMarks);
      for (let i = 0; i < students.length; i++) {
        students[i].position = i + 1;
        let resultMetaData = {
          name: students[i].studentId.name,
          studentId: students[i].studentId.studentId,
          id: students[i].studentId._id,
          totalScore: students[i].totalMarks,
          year: students[i].year,
          school: students[i].school,
          schoolId: students[i].schoolId,
          term: students[i].term,
          position: students[i].position,
          class: students[i].className,
          overallGrade: students[i].overallGrade,
          average: students[i].averageMarks,
          grades: students[i].grades,
          status: students[i].overallGrade == "F" ? "failed" : "passed",
        };

        bulkPushOperations.push({
          updateOne: {
            filter: {
              id: students[i].studentId._id,
              term: students[i].term,
              year: students[i].year,
            },
            update: { $set: resultMetaData },
            upsert: true,
          },
        });
      }
    }

    await Result.bulkWrite(bulkPushOperations);
    let allTerms = await Result.find({
      year,
      schoolId: schoolId,
      class: teacher?.formTeacher || "not a form teacher",
    });
    interface subP {
      totalScore: number;
      studentId: string;
      name: string;
      totalTerms: any;
      average: any;
      // grades: any[];
    }
    interface P {
      student: subP[];
      tracker: Map<string, number>;
    }
    const sampleData = [
      { totalScore: 0.85, name: "Alice", studentId: "N1", totalTerms: 0 },
      { totalScore: 0.92, name: "Alice", studentId: "N1", totalTerms: 0 },
      { totalScore: 0.78, name: "Alice", studentId: "N1", totalTerms: 0 },
      { totalScore: 0.9, name: "Bob", studentId: "N2", totalTerms: 0 },
      { totalScore: 0.88, name: "Bob", studentId: "N2", totalTerms: 0 },
      { totalScore: 0.91, name: "Charlie", studentId: "N3", totalTerms: 0 },
      { totalScore: 0.89, name: "David", studentId: "N4", totalTerms: 0 },
      { totalScore: 0.76, name: "Eve", studentId: "N5", totalTerms: 0 },
      { totalScore: 0.82, name: "Frank", studentId: "N6", totalTerms: 0 },
      { totalScore: 0.95, name: "Grace", studentId: "N7", totalTerms: 0 },
      { totalScore: 0.8, name: "Helen", studentId: "N8", totalTerms: 0 },
      { totalScore: 0.87, name: "Ivy", studentId: "N9", totalTerms: 0 },
      { totalScore: 0.93, name: "Jack", studentId: "N10", totalTerms: 0 },
      { totalScore: 0.94, name: "Jack", studentId: "N10", totalTerms: 0 },
      { totalScore: 0.89, name: "Jack", studentId: "N10", totalTerms: 0 },
      { totalScore: 0.9, name: "Bob", studentId: "N2", totalTerms: 0 },
      { totalScore: 0.87, name: "Charlie", studentId: "N3", totalTerms: 0 },
      { totalScore: 0.79, name: "Charlie", studentId: "N3", totalTerms: 0 },
      { totalScore: 0.85, name: "Eve", studentId: "N5", totalTerms: 0 },
      { totalScore: 0.76, name: "Frank", studentId: "N6", totalTerms: 0 },
    ];

    let cummulativeScore: subP[] = allTerms.reduce(
      (p: P, c) => {
        const { totalScore, studentId, name, totalTerms, average } = c;
        const i = p.tracker.get(studentId);
        if (totalScore) {
          let count = 1;
          if (i) {
            p.student[i].totalScore += totalScore;
            count += 1;
            p.student[i].totalTerms += 1;
            p.student[i].average += average;
          } else {
            p.tracker.set(studentId, p.student.length);

            p.student.push({
              studentId,
              totalScore,
              name,
              totalTerms: 1,
              average,
            });
          }
        } else {
          return p;
        }

        return p;
      },
      {
        student: [
          {
            totalScore: 0.1,
            studentId: "",
            name: "",
            totalTerms: 0,
            average: 0,
          },
        ],
        tracker: new Map(),
      }
    ).student;
    cummulativeScore.shift();

    cummulativeScore.map((student) => {
      student.average = student.average / student.totalTerms;

      if (
        student.average >=
        (_school?.gradePoints?.D ||
          _school?.gradePoints?.E8 ||
          _school?.gradePoints.E_m ||
          40)
      ) {
        let currentClassIndex = promotionClasses.findIndex(
          (currentClass) => currentClass === teacher.formTeacher.substr(0, 4)
        );

        currentClassIndex > -1 &&
          studentBulkOperations.push({
            updateOne: {
              filter: { studentId: student.studentId },
              update: {
                $set: {
                  currentClassLevel:
                    promotionClasses[
                      currentClassIndex + 1 < promotionClasses.length
                        ? currentClassIndex + 1
                        : currentClassIndex
                    ],
                  isGraduated: currentClassIndex + 1 > promotionClasses.length,
                },
              },
            },
          });
        return student;
      }
      return student;
    });
    await Student.bulkWrite(studentBulkOperations);
    return { groupedData, cummulativeScore };
  }
  private calculateOverallGrade(averageMarks: number, school: ISchool) {
    let overallGrade = "";
    if (averageMarks === -1) {
      overallGrade = "N/A";
    }

    for (let [grade, gradeValue] of Object.entries(
      (school.gradePoints as any).toObject()
    ).sort((a: Array<any>, b: Array<any>) => b[1] - a[1])) {
      if (averageMarks >= (gradeValue as number)) {
        overallGrade = grade;

        return overallGrade;
      }
    }
    // return overallGrade;
  }

  public async genResult(req: Request, res: Response) {
    try {
      let school = req.user?.school;
      let schoolId = req.user?.schoolId;
      let term = await AcademicTerm.findOne({
        school,
        schoolId,
        isCurrent: true,
      });
      let year = await AcademicYear.findOne({
        school,
        schoolId,
        isCurrent: true,
      });
      let allClassesInThisSchool = await ClassLevel.find({
        school,
        schoolId,
      });
      let registeredClasses = [];
      for (let i of allClassesInThisSchool) {
        registeredClasses.push(i.name);
      }
      let allClassesAvailable = [
        "NUR1",
        "NUR2",
        "NUR3",
        "PRY1",
        "PRY2",
        "PRY3",
        "PRY4",
        "PRY5",
        "PRY6",
        "JSS1",
        "JSS2",
        "JSS3",
        "SS1",
        "SS2",
        "SS3",
      ];

      let promotionClasses = [];
      for (let i in registeredClasses) {
        if (allClassesAvailable.includes(registeredClasses[i])) {
          promotionClasses.push(registeredClasses[i]);
        }
      }

      if (!year || !term)
        throw new CustomError({}, "set current term and current year", 400);

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
            $and: [
              { school },
              { schoolId },
              { year: year._id },
              { term: term._id },
            ],
          },
        },
      ]).exec();

      let groupedData = _.groupBy(gradesPipeline, (student: any) => {
        return `${student.studentId.currentClassLevel}${student.studentId.currentClassArm}`;
      });

      let results = await this.calcResult(groupedData, school, schoolId);
      //  await pushResultsToStudents(results, year, term);
      res.status(201).json({
        status: 201,
        msg: "results generated and pushed successfully.",
        results,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        error,
        err: error.message,
      });
    }
  }

  public async teacherGenerateResult(req: Request, res: Response) {
    try {
      let school = req.user?.school;
      let schoolId = req.user?.schoolId;
      const { id } = req.params;
      let term = await AcademicTerm.findOne({
        school,
        schoolId,
        isCurrent: true,
      });
      let year = await AcademicYear.findOne({
        school,
        schoolId,
        isCurrent: true,
      });
      const teacher = await Teacher.findById(id);
      if (!teacher?.formTeacher)
        throw new CustomError({}, "you are not a form teacher", 400);
      if (!year || !term)
        throw new CustomError({}, "set current term and current year", 400);

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
            $and: [
              { school },
              { schoolId },
              { year: year._id },
              { term: term._id },
              { className: teacher?.formTeacher },
            ],
          },
        },
      ]).exec();

      let groupedData = _.groupBy(gradesPipeline, (student: any) => {
        return `${student.studentId.currentClassLevel}${student.studentId.currentClassArm}`;
      });
      let promotionClasses: string[] =
        (await this.autoPromote(school, schoolId)) || [];

      // let results = await calcResult(groupedData);
      let results = !term.isPromotionTerm
        ? await this.calcResultAndCummulative(
            groupedData,
            school,
            year,
            schoolId,
            teacher
          )
        : await this.calcResultAndCummulativeAndAutoPromote(
            groupedData,
            school,
            year,
            schoolId,
            teacher,
            promotionClasses
          );
      //  await pushResultsToStudents(results, year, term);
      res.status(201).json({
        status: 201,
        msg: ` $ results generated and pushed successfully`,
        results,
      });
    } catch (error: any) {
      res.status(400).json({
        status: 400,
        error,
        err: error.message,
      });
    }
  }

  private async autoPromote(school: string, schoolId: string) {
    let registeredClasses = (await ClassLevel.find({ school, schoolId })).map(
      (e) => {
        return e.name?.substr(0, 4);
      }
    );

    let allClassesAvailable = [
      "NUR1",
      "NUR2",
      "NUR3",
      "PRY1",
      "PRY2",
      "PRY3",
      "PRY4",
      "PRY5",
      "PRY6",
      "JSS1",
      "JSS2",
      "JSS3",
      "SS1",
      "SS2",
      "SS3",
    ];
    let promotionClasses = [];
    for (let i in allClassesAvailable) {
      if (registeredClasses.includes(allClassesAvailable[i])) {
        promotionClasses.push(allClassesAvailable[i]);
      }
    }

    return promotionClasses;
  }
  // async function pushResultsToStudents(results: any, year: any, term: any) {
  //   const result = Object.values(results);
  //   const bulkOperations = [];
  //   const unsorted: any[] = result.flat();

  //   for (const i of unsorted) {
  //     console.log("processing result for student", i.studentId.name);

  // bulkOperations.push({
  //   updateOne: {
  //     filter: {
  //       school: i.school,
  //       schoolId: i.schoolId,
  //       _id: i.studentId._id,
  //     },
  //     update: {
  //       $addToSet: { examResults: i._id }, // Add the new result to the examResults array
  //     },
  //   },
  // });
  //}

  // try {
  //   const res = await Student.bulkWrite(bulkOperations);
  //   console.log(res, "hgf");
  // } catch (err) {
  //   console.error("Error updating examResults:", err);
  // }
  //}

  public async DeleteResult(req: Request, res: Response) {
    let { id } = req.params;
    const className = req.user?.formTeacher || "not a form teacher";
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

    if (!currentTerm || !currentYear)
      throw new CustomError(
        {},
        "either current term or current term not set",
        400
      );
    // console.log(,"6512473a6402d7f6a807af3b", student?._id,);

    let result = await Result.deleteMany({
      school,
      schoolId,
      year: currentYear?._id,
      // term: currentTerm?._id,
      studentId: id,
      class: className,
    });
    if (!result)
      throw new CustomError(
        {},
        "Result not found  for student for current year ",
        404
      );
    return res.status(200).json({
      msg: "successful deletion ",
      status: 200,
    });
  }
}

export default new ResultController();
