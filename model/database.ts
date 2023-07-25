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
import { Teacher } from "./models/models/staff/Teacher";
import { Admin } from "./models/models/staff/Admin";
import { Student } from "./models/models/academic/Student";

//schemas
export { Teacher, Admin, Student };
export default connectDB;
