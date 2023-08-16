import mongoose, { MongooseError, Types } from "mongoose";
import { Subject } from "../model/academic/Subject";
import { Response, Request, NextFunction } from "express";
import { setErrorStatusCode } from "../middleware/decorators";
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
   * addSubjects
   * editSubjects
   * deleteSubjects
   */
  @setErrorStatusCode(400)
  public async addSubjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { subjectName, className, teacherId } = req.body;
    let name = `${className.toUpperCase()}_${subjectName.toUpperCase()}`;
    let subjectExists = await Subject.findOne({ name });
    if (subjectExists)
      throw new Error("Subject already exists,to alter, edit subject");
    //
    let newSubject = new Subject({
      subjectName,
      className,
      teacherId,
    });
    await newSubject.save().then((e) => {
      res.status(201).json({
        status: "201",
        msg: "added subject successfully",
        subject: newSubject,
      });
    });
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
}
export default SubjectController;
