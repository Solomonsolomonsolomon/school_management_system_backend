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
import { CustomError } from "../middleware/decorators";
import { previewClassResults } from "./teacher.controller";
import student from "./student.controller";
export async function calcResult(groupedData: Dictionary<any>) {
  let bulkPushOperations: any = [];
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

      let overallGrade = "";
      if (averageMarks === -1) {
        overallGrade = "N/A";
      }
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
  return groupedData;
}
export async function calcResultAndCummulative(
  groupedData: Dictionary<any>,
  school: any,
  year: any,
  schoolId: any,
  teacher: any
) {
  let bulkPushOperations: any = [];

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

      let overallGrade = "";
      if (averageMarks === -1) {
        overallGrade = "N/A";
      }
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
  }
  interface P {
    student: subP[];
    tracker: Map<string, number>;
  }

  let cummulativeScore: subP[] = allTerms.reduce(
    (p: P, c) => {
      const { totalScore, studentId, name } = c;
      const i = p.tracker.get(studentId);
      if (totalScore) {
        if (i) {
          p.student[i].totalScore += totalScore;
        } else {
          p.tracker.set(studentId, p.student.length);
          p.student.push({ studentId, totalScore, name });
        }
      } else {
        return p;
      }

      return p;
    },
    {
      student: [{ totalScore: 0, studentId: "", name: "" }],
      tracker: new Map(),
    }
  ).student;
  cummulativeScore.shift();
  return { groupedData, cummulativeScore };
}

export async function calcResultAndCummulativeAndAutoPromote(
  groupedData: Dictionary<any>,
  school: any,
  year: any,
  schoolId: any,
  teacher: any,
  promotionClasses: any[]
) {
  let bulkPushOperations: any = [];
  let studentBulkOperations: any[] = [];
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

      let overallGrade = "";
      if (averageMarks === -1) {
        overallGrade = "N/A";
      }
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
    //average: number;
    // grades: any[];
  }
  interface P {
    student: subP[];
    tracker: Map<string, number>;
  }

  let cummulativeScore: subP[] = allTerms.reduce(
    (p: P, c) => {
      const { totalScore, studentId, name, grades } = c;
      const i = p.tracker.get(studentId);
      if (totalScore ) {
        if (i) {
          console.log("wow");
          p.student[i].totalScore += totalScore;
        } else {
          p.tracker.set(studentId, p.student.length);
          p.student.push({ studentId, totalScore, name });
        }
      } else {
        return p;
      }
      return p;
    },
    {
      student: [{ totalScore: 0, studentId: "", name: "" }],
      tracker: new Map(),
    }
  ).student;

  cummulativeScore.shift();
  console.log(cummulativeScore);
  cummulativeScore.map((student) => {

    if (student.totalScore >= 40) {
      let currentClassIndex = promotionClasses.findIndex(
        (currentClass) => currentClass === teacher?.formTeacher
      );
      currentClassIndex >= 0 &&
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
                isGraduated: !!(
                  currentClassIndex + 1 >
                  promotionClasses.length
                ),
              },
            },
          },
        });
    }
  });
  await Student.bulkWrite(studentBulkOperations);
  return { groupedData, cummulativeScore };
}
// export async function saveResult(student: any, term: number, year: string) {
//   try {
//     await Result.findOne({ student, term, year }).then((resultInstance) => {
//       if (!resultInstance) throw new Error("hi");
//       //im trying to replace result details if it already exists and i want to use bulk write so that i will use only one db call please help me
//     });
//   } catch (error) {
//     throw error;
//   }
// }
export async function genResult(req: Request, res: Response) {
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
    let results = await calcResult(groupedData);
    //  await pushResultsToStudents(results, year, term);
    res.status(201).json({
      status: 201,
      msg: "results generated and pushed successfully",
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

export async function teacherGenerateResult(req: Request, res: Response) {
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
    // let results = await calcResult(groupedData);
    let results = !term.isPromotionTerm
      ? await calcResultAndCummulative(
          groupedData,
          school,
          year,
          schoolId,
          teacher
        )
      : await calcResultAndCummulativeAndAutoPromote(
          groupedData,
          school,
          year,
          schoolId,
          teacher,
          []
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

autoPromote();
export async function autoPromote() {
  let registeredClasses = [
    "NUR3",
    "PRY6",
    "PRY4",
    "PRY2",
    "SS3",
    "JSS1",
    "NUR1",
    "PRY5",
  ];
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
  console.log(promotionClasses);
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
