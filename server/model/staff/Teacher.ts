import mongoose, { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";
interface ITeacher {
  name: string;
  email: string;
  accessToken?: string;
  password: string;
  dateEmployed?: Date;
  teacherId?: string;
  formTeacher?: string;
  isWithdrawn?: boolean;
  isSuspended?: boolean;
  role?: string;
  subjects?: Schema.Types.ObjectId[];
  applicationStatus?: "pending" | "approved" | "rejected";
  program?: string;
  classLevel?: string;
  academicYear?: string;
  examsCreated?: Schema.Types.ObjectId[];
  createdBy?: Schema.Types.ObjectId;
  academicTerm?: string;
  performanceSheet?: string;
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      default: "",
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
    //if withdrawn, the teacher will not be able to login
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
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        // required: true,
      },
    ],
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
    performanceSheet: String,
  },

  {
    timestamps: true,
  }
);

//Hash password
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //Salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Verify Password
teacherSchema.methods.verifiedPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//model
const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);

export { Teacher, ITeacher };
