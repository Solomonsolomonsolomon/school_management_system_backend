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
    let school = req.body?.school || req.user?.school;
    await Admin.findOne({ name, school }).then(
      async (alreadyRegistered: object | null) => {
        if (alreadyRegistered) {
          throw new Error("This particular admin already registered");
        } else {
          await new Admin({
            name,
            email,
            password,
            school,
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
    let school = req.user?.school;
    let { name, email, password, role, dateEmployed, formTeacher } = req.body;
    await Teacher.findOne({ email, school }).then(
      async (alreadyRegistered: object | null) => {
        if (alreadyRegistered) {
          throw new Error("This particular teacher already registered");
        } else {
          await new Teacher<ITeacher>({
            ...req.body,
            school,
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
  let school = req.user?.school;
  let isStudentAlreadyRegistered = !!(await Student.countDocuments({
    name,
    school,
  }));
  if (isStudentAlreadyRegistered)
    throw new CustomError({}, "student already registered", 403);
  let isClassAvailable = !!(await ClassLevel.countDocuments({
    name: `${currentClassLevel}${currentClassArm}`,
    school,
  }));
  if (!isClassAvailable)
    throw new CustomError(
      {},
      "the class you selected is not available.please register and try again",
      404
    );
  let newStudent = new Student({
    ...req.body,
    school,
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
    let school = req.user?.school;
    const { studentId } = req.params;
    await Student.findOneAndRemove({ studentId, school })
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
    let school = req.user?.school;
    await Teacher.findOneAndRemove({ teacherId, school })
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
    let school = req.user?.school;
    await Admin.find({ school }).then((admins) => {
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
    await Student.find({ school: req.user?.school })
      .sort({ name: 1 })
      .then((student) => {
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
      msg: error.message,
      error,
      err: error.message,
    });
  }
}

export async function getAllTeachers(req: Request, res: Response) {
  try {
    let school = req?.user?.school;
    await Teacher.find({ school })
      .populate("subjects")
      .then((teacher: any) => {
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
    let totalStudents = await Student.find({ school: req.user?.school });
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
export async function countTeachers(req: Request, res: Response) {
  let school = req?.user?.school;
  let noOfTeachers = await Teacher.countDocuments({ school });
  res.status(200).json({
    status: 200,
    msg: "teachers number found",
    noOfTeachers,
  });
}
export async function editStudent(req: Request, res: Response) {
  const { studentId } = req.params;
  const { currentClassLevel, currentClassArm } = req.body;
  let student = await Student.findOne({ studentId });

  if (!student) throw new CustomError({}, "student not found", 404);
  let name = `${currentClassLevel}${currentClassArm}`;
  let isValidClass = !!(await ClassLevel.countDocuments({
    name,
  }));

  if (!isValidClass)
    throw new CustomError({}, "enter existing class Level", 404);
  let newStudentDetails = req.body;
  let currrentVersion = student.__v;
  Object.assign(student, newStudentDetails);
  student.__v = currrentVersion;
  await student.save();
  res.status(200).json({
    status: 200,
    msg: "edited successfully",
  });
}

export async function editTeacher(req: Request, res: Response) {
  const { id } = req.params;
  // const { email } = req.body;
  let teacher = await Teacher.findOne({ _id: id });
  if (!teacher) throw new CustomError({}, "teacher not found", 404);
  //   throw new CustomError({}, "enter existing class Level", 404);
  let newteacherDetails = req.body;
  let currrentVersion = teacher.__v;
  Object.assign(teacher, newteacherDetails);
  teacher.__v = currrentVersion;
  await teacher.save();
  res.status(200).json({
    status: 200,
    msg: "edited successfully",
  });
}
