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
import { Grades } from "./academic/grades";

//schemas
export { Teacher, Admin, Student, Grades };
export { ITeacher, IStudent };
export default connectDB;
