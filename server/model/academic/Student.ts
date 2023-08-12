import bcrypt from "bcrypt";
import mongoose, { Schema, Document, Types, model, Model } from "mongoose";
interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  studentId?: string;
  gender: string;
  age?: string;
  role: string;
  status?: "string";
  accessToken?: string;
  classLevels?: Types.ObjectId[];
  currentClassLevel?: string;
  isPromoted?: boolean;
  currentClassArm?: string;
  academicYear?: Types.ObjectId;
  dateAdmitted?: Date;
  examResults?: Types.ObjectId[];
  program?: Types.ObjectId;
  isPromotedToLevel200?: boolean;
  isPromotedToLevel300?: boolean;
  isPromotedToLevel400?: boolean;
  isGraduated?: boolean;
  isWithdrawn?: boolean;
  isSuspended?: boolean;
  prefectName?: string;
  yearGraduated?: String;
  // virtuals
  className?: string;
}
const studentSchema: Schema = new mongoose.Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      default: function (this: IStudent) {
        return (
          "STU" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map((name: string) => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
    gender: {
      required: true,
      type: String,
      enum: ["M", "F"],
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      default: "student",
    },
    status: {
      type: String,
      emum: [
        "active",
        "suspended",
        "repeated",
        "expelled",
        "withdrawn",
        "promoted",
      ],
      default: "active",
    },
    accessToken: {
      type: String,
      default: "",
    },
    //Classes are from level 1 to 6
    //keep track of the class level the student is in
    classLevels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
      },
    ],
    currentClassLevel: {
      type: String,
      default: function (this: IStudent) {
        return this.classLevels
          ? this.classLevels[this.classLevels.length - 1]
          : "";
      },
    },
    currentClassArm: {
      type: String,
      default: "A",
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    dateAdmitted: {
      type: Date,
      default: Date.now,
    },

    examResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExamResult",
      },
    ],

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },

    isPromotedToLevel200: {
      type: Boolean,
      default: false,
    },
    isPromotedToLevel300: {
      type: Boolean,
      default: false,
    },
    isPromotedToLevel400: {
      type: Boolean,
      default: false,
    },
    isGraduated: {
      type: Boolean,
      default: false,
    },
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    prefectName: {
      type: String,
    },
    // behaviorReport: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "BehaviorReport",
    //   },
    // ],
    // financialReport: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "FinancialReport",
    //   },
    // ],
    //year group
    yearGraduated: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Hash password
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //Salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
studentSchema.pre("save", async function (next) {
  let classes = [
    "NUR1",
    "NUR2",
    "NUR3",
    "PRY1",
    "PRY2",
    "PRY3",
    "PRY4",
    "PRY5",
    "PRY6",
    "JSS1",
    "JSS2",
    "JSS3",
    "SS1",
    "SS2",
    "SS3",
  ];
  if (
    this.isModified("currentClassLevel") ||
    this.isModified("classLevel") ||
    this.isModified("isPromoted")
  ) {
    if (this.isPromoted) {
      const currentIndex = classes.indexOf(this.currentClassLevel);
      if (currentIndex !== -1 && currentIndex < classes.length - 1) {
        this.currentClassLevel = classes[currentIndex + 1];
      }
    } else {
      this.currentClassLevel;
    }
  }
});
// Verify Password
studentSchema.methods.verifiedPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//setting virtual className
studentSchema.virtual("className").get(function (this: IStudent) {
  return `${this.currentClassLevel}${this.currentClassArm}`;
});
//model
const Student = model<IStudent>("Student", studentSchema);

export { Student, IStudent };
