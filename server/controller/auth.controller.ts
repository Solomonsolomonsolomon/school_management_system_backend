import jwt, { Secret } from "jsonwebtoken";
import { Admin, Student, Teacher } from "./../model/database";
import { NextFunction, Request, Response } from "express";
export async function signIn(req: Request, res: Response) {
  const { email, password, role } = req.body;
  let roles: string[] = ["student", "admin", "teacher"];
  let index: number = roles.indexOf(role);
  let user: any = null;
  try {
    if (!email || !password || !role) {
      throw new Error("enter email and password");
    }
    let Model: any =
      index == 0 ? Student : index == 1 ? Admin : index == 2 ? Teacher : Admin;
    await Model.findOne({ email }).then(async (user: any) => {
      if (!user) throw new Error("invalid credentials");
      if (await user.verifiedPassword(password)) {
        let ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
        let accessToken = await jwt.sign(
          { name: user.name },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );
       user.accessToken = accessToken;
        await user.save().then(() => {
          res.status(200).json({
            msg: "successful signin",
            accessToken,
            accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
            user,
            status: 200,
          });
        });
      } else {
        throw new Error("invalid credentials");
      }
    });
  } catch (error: any) {
    // Handle the error appropriately
    res.status(401).json({
      status: 401,
      error,
      err: error.message,
      msg: "signIn failed",
    });
  }
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    let { role, email } = req.params;
    if (!role || !email) {
      throw new Error(
        "enter role and email as params like baseurl:port/v1/auth/logout/:role/:email"
      );
    }
    let roles: string[] = ["admin", "student", "teacher"];
    let index: number = roles.indexOf(role.toLocaleLowerCase());
    let user: any = null;
    switch (index) {
      case 0:
        user = await Admin.findOne({ email });
        break;
      case 1:
        user = await Student.findOne({ email });
        break;
      case 2:
        user = await Teacher.findOne({ email });
      default:
        break;
    }

    if (!user) {
      throw new Error("invalid user");
    }
    user.accessToken = "";
    user.save().then(() => {
      res.json({
        status: 200,
        msg: "successful logout",
        user,
      });
    });
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      msg: "failed to logout",
      error,
      err: error.message,
    });
  }
}
