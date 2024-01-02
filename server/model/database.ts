import mongoose, { MongooseError, Schema, model } from "mongoose";

async function connectDB() {
  let connectionString: string =
    typeof process.env.LOCAL_MONGO_URI == "string"
      ? process.env.LOCAL_MONGO_URI
      : "";
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log(`database Successfully connected`);
    })
    .catch((err: MongooseError) => {
      console.log(`ERR!!! database not connected~${err.message}`);
    });
}
import { Teacher, ITeacher } from "./staff/Teacher";
import { Admin } from "./staff/Admin";
import { Student, IStudent } from "./academic/Student";
import { Grades } from "./academic/Grades";
import { Result } from "./academic/Result";
import { Subject } from "./academic/Subject";
import { AcademicTerm, ITerm } from "./academic/AcademicTerm";
import { AcademicYear, IYear } from "./academic/AcademicYear";
import { ClassLevel } from "./academic/ClassLevel";
import { School } from "./others/School";
import { Transaction } from "./others/Transacton";
import { Subscription } from "./others/Subscription";
import { Bus } from "./others/Bus";
import { Chat } from "./others/Chat";
import User from "./others/Users";
import { Messages } from "./others/Messages";

//schemas
export {
  Teacher,
  Admin,
  Student,
  Grades,
  Result,
  Subject,
  AcademicTerm,
  AcademicYear,
  ClassLevel,
  School,
  Transaction,
  Subscription,
  Bus,
  Messages,
  Chat,
  
};
export { ITeacher, IStudent, IYear, ITerm };

export default connectDB;


