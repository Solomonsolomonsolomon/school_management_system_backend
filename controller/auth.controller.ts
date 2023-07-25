import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { Admin, Student, Teacher } from "./../model/database";
import { Request, Response } from "express";
import { Document, Models, model } from "mongoose";




export async function signUp(req:Request,res:Response) {
    
}






export async function signIn(req: Request, res: Response) {
  const { username, password, role } = req.body;
  let roles = ["student", "admin", "teacher"];
  let index: number = roles.indexOf(role);
  let user: any = null;
  try {
    switch (index) {
      case 0:
        user = await Student.findOne({ username });
        break;
      case 1:
        user = await Admin.findOne({ username });
        break;
      case 2:
        user = await Teacher.findOne({ username });
        break;
      default:
        break;
    }

    if (user == null) {
      throw new Error("invalid login credentials");
    }

    if (user) {
      let ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
      let accessToken = jwt.sign(
        { username: user.username },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "50s",
        }
      );
      res.json(accessToken);
    }
  } catch (error) {
    // Handle the error appropriately
    console.log(error);
  }
}
