import mongoose from "mongoose";

const { Schema } = mongoose;
interface IProgram {
  name: string;
  description: string;
  duration: string;
  code: string;
  createdBy: mongoose.Types.ObjectId;
  teachers: mongoose.Types.ObjectId[];
  students: mongoose.Types.ObjectId[];
  subjects: mongoose.Types.ObjectId[];
}
const ProgramSchema = new Schema<IProgram>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "6 years",
    },
    // created automatically
    //JGSPE
    code: {
      type: String,
      default: function (this:IProgram) {
        return (
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase() +
          Math.floor(10 + Math.random() * 90) +
          Math.floor(10 + Math.random() * 90)
        );
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    //we will push the teachers that are in charge of the program
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    //we will push the subjects that are in the program when the program is created
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;
