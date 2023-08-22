import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError } from "../middleware/decorators";
import {
  Admin,
  Student,
  Teacher,
  ITeacher,
  ClassLevel,
  AcademicTerm,
} from "./../model/database";
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
            ...req.body,
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
  let { name, email, currentClassLevel, currentClassArm } = req.body;
  let isStudentAlreadyRegistered = !!(await Student.countDocuments({
    name,
    email,
  }));
  if (isStudentAlreadyRegistered)
    throw new CustomError({}, "student already registered", 403);
  let isClassAvailable = !!(await ClassLevel.countDocuments({
    name: `${currentClassLevel}${currentClassArm}`,
  }));
  if (!isClassAvailable)
    throw new CustomError(
      {},
      "the class you selected is not available.please register and try again",
      404
    );
  let newStudent = new Student({
    ...req.body,
  });
  await newStudent.save();
  res.status(201).json({
    status: 201,
    msg: "registered student successfully",
  });
}

export async function deleteAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await Admin.findOneAndRemove({ _id: id })
      .then((user) => {
        if (!user) {
          throw new Error("Invalid Admin Id");
        }
        res.status(200).json({
          status: 200,
          msg: "deleted admin successfully",
          user,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      msg: "failed to delete user",
      err: error.message,
      error,
    });
  }
}

export async function deleteStudent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { studentId } = req.params;
    await Student.findOneAndRemove({ studentId })
      .then((user) => {
        if (!user) {
          throw new Error("Invalid studentId");
        }
        res.status(200).json({
          status: 200,
          msg: "deleted student successfully",
          user,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      msg: "failed to delete user",
      err: error.message,
      error,
    });
  }
}

export async function deleteTeacher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { teacherId } = req.params;
    await Teacher.findOneAndRemove({ teacherId })
      .then((user) => {
        if (!user) {
          throw new Error("Invalid teacherId");
        }
        res.status(200).json({
          status: 200,
          msg: "deleted teacher successfully",
          user,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      msg: "failed to delete user",
      err: error.message,
      error,
    });
  }
}

export async function getAllAdmin(req: Request, res: Response) {
  try {
    await Admin.find({}).then((admins) => {
      if (admins.length < 1) throw new Error("No admin found");
      res.status(200).json({
        status: 200,
        msg: "all admins fetched successfully",
        admins,
      });
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      msg: "internal server error.its not your fault",
      error,
      err: error.message,
    });
  }
}

export async function getAllStudents(req: Request, res: Response) {
  try {
    await Student.find({}).then((student) => {
      if (student.length < 1) throw new Error("No student found");
      res.status(200).json({
        status: 200,
        msg: "all students fetched successfully",
        student,
      });
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      msg: "AN ERROR OCCURED!!it might not be your fault",
      error,
      err: error.message,
    });
  }
}

export async function getAllTeachers(req: Request, res: Response) {
  try {
    await Teacher.find({}).then((teacher) => {
      if (teacher.length < 1) throw new Error("No teacher found");
      res.status(200).json({
        status: 200,
        msg: "all teachers fetched successfully",
        teacher,
      });
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      msg: "internal server error.its not your fault",
      error,
      err: error.message,
    });
  }
}

export async function getGenderDivide(req: Request, res: Response) {
  try {
    let totalStudents = await Student.find({});
    let males = 0;
    let females = 0;
    totalStudents.forEach((student: any) => {
      student.gender == "M" ? (males += 1) : (females += 1);
    });
    res.status(200).json({
      status: 200,
      msg: `female to male ratio is ${females / females}to${
        males / females
      } .please note that this may be inaccurate,perform your own calculation`,
      females,
      males,
      totalStudents: totalStudents.length,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      msg: "internal server error!..an error occured but its not your fault",
      err: error.message,
      error,
    });
  }
}
