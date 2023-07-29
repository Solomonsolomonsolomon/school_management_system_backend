import { Subject } from "../model/academic/Subject";
import { Response, Request } from "express";
export async function addSubject(req: Request, res: Response) {
  try {
    const { subjectName, className, teacherId } = req.body;
    await Subject.find({ className, subjectName }).then((subject) => {
      if (!subject) {
        new Subject({
          subjectName,
          className,
          teacherId,
        })
          .save()
          .then((subject) => {
            res.json(201).json({
              status: 201,
              msg: "added subject successfully",
              subject,
            });
          });
      } else {
        throw new Error("subject already added");
      }
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      msg: "subject addition failed",
      error,
      err: error.message,
    });
  }
}
