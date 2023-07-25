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
let teacherSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  maxQualifications: String,
  formTeacher: String,
  subject: [
    {
      class: String,
      subject: [String],
    },
  ],
});
let studentSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  class: String,
  promoted: Boolean,
  subjects: [String],
  achievments: [String],
});
let adminSchema = new Schema({
  firstname: String,
  lastname: String,
  username:String,
  password: String,
});
let resultSchema = new Schema({
  session: String,
  term: Number,
  position: Number,
  average: Number,
});

let Teacher = model("Teacher", teacherSchema);
let Student = model("Student", studentSchema);
let Admin = model("Admin", adminSchema);
let Result = model("Result", resultSchema);
export { Teacher, Student, Admin, Result };
export default connectDB;
