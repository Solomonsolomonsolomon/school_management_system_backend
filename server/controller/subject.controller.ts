import mongoose, { MongooseError, Types } from "mongoose";
import { Subject } from "../model/academic/Subject";
import { Response, Request, NextFunction } from "express";
import { CustomError, setErrorStatusCode } from "../middleware/decorators";
import { Student } from "../model/database";
import { set } from "lodash";
//setErrorStatusCode is a decorator that sets the status Code on error
// export async function addSubject(req: Request, res: Response) {
//   try {
//     const { subjectName, className, teacherId } = req.body;
//     await Subject.find({ className, subjectName }).then((subject) => {
//       if (subject.length < 1) {
//         new Subject({
//           subjectName,
//           className,
//           teacherId,
//         })
//           .save()
//           .then((subject) => {
//             res.status(201).json({
//               status: 201,
//               msg: "added subject successfully",
//               subject,
//             });
//           });
//       } else {
//         throw new Error("subject already added");
//       }
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       status: 400,
//       msg: "subject addition failed",
//       error,
//       err: error.message,
//     });
//   }
// }

class SubjectController {
  /**
   * getAllSubjects
   * addSubjects
   * editSubjects
   * deleteSubjects
   */

  public async getAllSubjects(req: Request, res: Response) {
    //   let allSubjects = await Subject.find({});
    //   if (!allSubjects.length)
    //     throw new CustomError({}, "no subjects found", 404);
    //   res
    //     .status(200)
    //     .json({ status: 200, msg: "all students found", subjects: allSubjects });
    let subjectsRawForm = await Subject.find({});
    let sorted = subjectsRawForm.reduce<any>((prev, curr) => {
      if (!prev[curr.className]) {
        prev[curr.className] = [];
      }
      prev[curr.className].push(curr);
      return prev;
    }, {});
    res.status(200).json({
      status: 200,
      msg: "fetched successfully",
      subjects: sorted,
    });
  }
  @setErrorStatusCode(400)
  public async addSubjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const bulkPush: any[] = [];
    const { subject, className, teacherId } = req.body;
    for (let i of className) {
      bulkPush.push({
        updateOne: {
          filter: {
            name: `${i.toUpperCase()}_${subject.toUpperCase()}`,
          },
          update: {
            $set: {
              name: `${i.toUpperCase()}_${subject.toUpperCase()}`,
              className: i,
              subject,
              teacherId: teacherId || null,
            },
          },
          upsert: true,
        },
      });
    }
    let status = (await Subject.bulkWrite(bulkPush)).isOk();
    if (status) {
      return res
        .status(201)
        .json({ status: 200, msg: "added subject successfully" });
    } else {
      throw new CustomError({}, "possible error in addition", 400);
    }
    //   let name = `${className.toUpperCase()}_${subjectName.toUpperCase()}`;
    //   let subjectExists = await Subject.findOne({ name });
    //   if (subjectExists)
    //     throw new Error("Subject already exists,to alter, edit subject");
    //   //
    //   let newSubject = new Subject({
    //     subjectName,
    //     className,
    //     teacherId,
    //   });
    //   await newSubject.save().then((e) => {
    //     res.status(201).json({
    //       status: "201",
    //       msg: "added subject successfully",
    //       subject: newSubject,
    //     });
    //   });
  }
  @setErrorStatusCode(400)
  public async editSubjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    let { id } = req.params;
    let _id = await new Types.ObjectId(id);
    let original = await Subject.findOne({ _id });
    if (!original) throw new Error("Subject not found");
    Object.assign(original, req.body);
    await original.save().then((edited) => {
      res.status(200).json({
        status: 200,
        msg: "subject edit successful",
        edited,
      });
    });
  }
  @setErrorStatusCode(400)
  public async deleteSubjects(req: Request, res: Response) {
    let { id } = req.params;
    let _id = new Types.ObjectId(id);
    await Subject.findOneAndRemove({ _id })
      .then((e) => {
        if (!e) throw new Error("Subject not found");
        res.status(200).json({
          status: 200,
          msg: "subject deleted successfully",
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  public async getAllSubjectsAsJson(req: Request, res: Response) {
    let all = await Subject.find({});
    if (!all) throw new CustomError({}, "no subject found", 404);
    res.status(200).json({
      status: 200,
      asJson: all,
    });
  }
}
export default SubjectController;
