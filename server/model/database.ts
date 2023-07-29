import mongoose, { MongooseError, Schema, model } from "mongoose";

async function connectDB() {
  let connectionString: string =
    typeof process.env.MONGO_URI == "string"
      ? process.env.MONGO_URI
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

//schemas
export { Teacher, Admin, Student };
export { ITeacher, IStudent };
export default connectDB;
