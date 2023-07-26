import mongoose, { Schema, Document, model } from "mongoose";

interface ITeacher {
  name: string;
  email: string;
  password: string;
  dateEmployed?: Date;
  teacherId?: string;
  formTeacher?: string;
  isWithdrawn?: boolean;
  isSuspended?: boolean;
  role?: string;
  subject?: Schema.Types.ObjectId;
  applicationStatus?: "pending" | "approved" | "rejected";
  program?: string;
  classLevel?: string;
  academicYear?: string;
  examsCreated?: Schema.Types.ObjectId[];
  createdBy?: Schema.Types.ObjectId;
  academicTerm?: string;
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    teacherId: {
      type: String,
      required: true,
      default: function (this: ITeacher) {
        return (
          "TEA" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map((name: any) => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
    formTeacher: {
      type: String,
    },
    //if witdrawn, the teacher will not be able to login
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    //if suspended, the teacher can login but cannot perform any task
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      // required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    program: {
      type: String,
    },
    //A teacher can teach in more than one class level
    classLevel: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    examsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      // required: true,
    },
    academicTerm: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//model
const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);

export { Teacher, ITeacher };
