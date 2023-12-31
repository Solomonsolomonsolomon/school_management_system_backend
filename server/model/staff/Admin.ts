import bcrypt from "bcrypt";

import mongoose, { model, Schema, Document, Types } from "mongoose";

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  accessToken: string;
  // academicTerms?: Types.ObjectId[];
  school: string;
  schoolId:string;
  plan: string;
  programs?: Types.ObjectId[];
  yearGroups?: Types.ObjectId[];
  academicYears?: Types.ObjectId[];
  classLevels?: Types.ObjectId[];
  teachers?: Types.ObjectId[];
  students?: Types.ObjectId[];
}
const adminSchema = new Schema<IAdmin>(
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
    role: {
      type: String,
      default: "admin",
    },
    school: {
      type: String,
      required: true,
    },
    schoolId: {
      type: String,
      required: true,
      default: function (this: IAdmin) {
        return (
          "SCH" +
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
    plan: {
      type: String,
      enum: ["basic", "standard", "advanced"],
      default: "basic",
    },
    accessToken: {
      type: String,
      default: "",
    },
    programs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
      },
    ],
    yearGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "YearGroup",
      },
    ],
    academicYears: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
      },
    ],
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Hash password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //Salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Verify Password
adminSchema.methods.verifiedPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//model
const Admin = model<IAdmin>("Admin", adminSchema);
Admin.syncIndexes();

export { Admin };