import mongoose, { Schema, Document, Types, model, Model } from "mongoose";
interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  studentId: string;
  role: string;
  classLevels: Types.ObjectId[];
  currentClassLevel: string;
  academicYear: Types.ObjectId;
  dateAdmitted: Date;
  examResults: Types.ObjectId[];
  program: Types.ObjectId;
  isPromotedToLevel200: boolean;
  isPromotedToLevel300: boolean;
  isPromotedToLevel400: boolean;
  isGraduated: boolean;
  isWithdrawn: boolean;
  isSuspended: boolean;
  prefectName: string;
  yearGraduated: String;
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
    },
    password: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      default: function () {
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
    role: {
      type: String,
      default: "student", 
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
      default: function () {
        return this.classLevels[this.classLevels.length - 1];
      },
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
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

//model
const Student = model<IStudent>("Student", studentSchema);

export { Student };
