import jwt from "jsonwebtoken";
import { Admin, Student, Teacher } from "./../model/database";
import { Response, Request, NextFunction } from "express";
import { model, Document } from "mongoose";

export default async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let authHeaders = req.headers["authorization"];
    let role = req.headers["role"];
    let Model: any =
      role == "admin"
        ? Admin
        : role == "student"
        ? Student
        : role == "teacher"
        ? Teacher
        : Admin;

    if (authHeaders) {
      let Authorization = authHeaders.split(" ");
      await Admin.find({ academicTerms: Authorization[1].trim() }).then((e) => {
      //  console.log("mmm", e);
      });
      let user: any = await Model.findOne({ accessToken: Authorization[1] });
      console.log(Authorization, user);
      if (Authorization[0].toLowerCase() === "bearer" && user) {
        let token = Authorization[1];
        let ACCESS_TOKEN_SECRET: any = process.env.ACCESS_TOKEN_SECRET;
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
          if (err) throw err;
          next();
        });
      } else {
        throw Error(
          "add role header and set Authorizaton header- Bearer token"
        );
      }
    } else {
      throw new Error(
        "enter accessToken in an Authorization header as Bearer token"
      );
    }
  } catch (error: any) {
    res.status(401).json({
      msg: "access token verification failed",
      status: 401,
      error,
      err: error.message,
    });
  }
}
