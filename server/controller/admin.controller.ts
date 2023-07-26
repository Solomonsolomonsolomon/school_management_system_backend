import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { Admin, Student, Teacher, ITeacher } from "./../model/database";
import { NextFunction, Request, Response } from "express";

export async function addAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { name, email, password, role } = req.body;
    await Admin.findOne({ name, email }).then(
      async (alreadyRegistered: object | null) => {
        if (alreadyRegistered) {
          throw new Error("This particular admin already registered");
        } else {
          await new Admin({
            name,
            email,
            password,
            role,
          })
            .save()
            .then((admin) => {
              res.json({
                msg: "admin added successfully",
                status: 200,
                admin,
              });
            })
            .catch((err) => {
              throw err;
            });
        }
      }
    );
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      error,
      err: error.message,
      msg: "failed to add admin",
    });
  }
}

export async function addTeacher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { name, email, password, role, dateEmployed, formTeacher } = req.body;
    await Teacher.findOne({ name, email }).then(
      async (alreadyRegistered: object | null) => {
        if (alreadyRegistered) {
          throw new Error("This particular teacher already registered");
        } else {
          await new Teacher<ITeacher>({
            email,
            name,
            password,
            dateEmployed,
            formTeacher,
          })
            .save()
            .then((teacher) => {
              res.json({
                msg: "teacher added successfully",
                status: 200,
                teacher,
              });
            })
            .catch((err) => {
              throw err;
            });
        }
      }
    );
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      error,
      err: error.message,
      msg: "failed to add teacher",
    });
  }
}

export async function addStudent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { name, email, password, role } = req.body;
    await Student.findOne({ name, email }).then(
      async (alreadyRegistered: object | null) => {
        if (alreadyRegistered) {
          throw new Error("This particular teacher already registered");
        } else {
          await new Student({
            email,
            name,
            password,
          })
            .save()
            .then((student) => {
              res.json({
                msg: "student added successfully",
                status: 200,
                student,
              });
            })
            .catch((err) => {
              throw err;
            });
        }
      }
    );
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      error,
      err: error.message,
      msg: "failed to add student",
    });
  }
}
