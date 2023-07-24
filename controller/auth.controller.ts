import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, Student, Teacher } from "./../model/database";
import { Request, Response } from "express";
import { Document, Models, model } from "mongoose";
export async function signIn(req: Request, res: Response) {
  const { username, password, role } = req.body;
  const choices = ["Admin", "Student", "Teacher"];
  let index = choices.indexOf(role);

  if (index === -1) {
    index = 1;
  }

  let Model;
  switch (index) {
    case 0:
      Model = Admin;
      break;
    case 1:
      Model = Student;
      break;
    case 2:
      Model = Teacher;
      break;
    default:
      Model = Student;
      break;
  }

  try {
    Model.find({ username })
      .exec()
      .then((user: object) => {
        console.log(user);
      });
    // Process the user object as needed
  } catch (error) {
    // Handle the error appropriately
  }
}
