import mongoose, { MongooseError } from "mongoose";
import { Subject } from "../model/academic/Subject";
import { Response, Request, NextFunction } from "express";
class CustomError extends Error {
  constructor(error: any, statusCode: number) {
    super(error);
    this.statusCode = statusCode;
  }
}
//decorators
function setStatusCode(statusCode: number) {
  return function (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    let original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (error) {
        console.error(error);
      }
    };
  };
}
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
   */

  public async addSubjects(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { subjectName, className, teacherId } = req.body;
    let subjectExists = await Subject.findOne({ subjectName });
    if (subjectExists)
      throw new Error("Subject already exists,to alter, edit subject");
    //
    let newSubject = new Subject({
      subjectName,
      className,
      teacherId,
    });
    await newSubject.save().catch((err) => {
      err.status = 400;
      throw err;
    });
  }
}
export default SubjectController;
