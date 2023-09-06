import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;
interface ISubject {
  name?: string;
  subject: string;
  className: string;
  school: string;
  plan: string;
  academicYear?: Types.ObjectId;
  teacherId?: Types.ObjectId;
}
// const subjectSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     teacher: {
//       type: Schema.Types.ObjectId,
//       ref: "Teacher",
//     },
//     academicTerm: {
//       type: Schema.Types.ObjectId,
//       ref: "AcademicTerm",
//       required: true,
//     },
//     createdBy: {
//       type: Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },
//     duration: {
//       type: String,
//       required: true,
//       default: "3 months",
//     },

//   },
//   { timestamps: true }
// // );
// const subjectSchema = new Schema({
//   name: {
//     type: String,
//   },
//   // subjectName: {
//   //   type: String,
//   //
//   //
//   // },
//   subject: {
//     type: String,
//   },
//   teacherId: {
//     type: Types.ObjectId,
//     ref: "Teacher",
//   },
//   academicYear: {
//     type: Schema.Types.ObjectId,
//     ref: "AcademicYear",
//   },
//   // academicYear: {
//   //   type: String,
//   //   default: () => {
//   //     let date = new Date();
//   //     //september begins new academic year
//   //     return date.getMonth() < 8
//   //       ? `${date.getFullYear() - 1}/${date.getFullYear()}`
//   //       : `${date.getFullYear()}/${date.getFullYear() + 1}`;
//   //   },
//   // },
//   className: {
//     type: String,
//     required: true,
//   },
// });
const SubjectSchema = new mongoose.Schema<ISubject>({
  name: {
    type: String,
    unique: true,
  },
  academicYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear",
  },
  className: {
    type: String,
  },
  subject: {
    type: String,
  },
  school: {
    type: String,
  },
  plan: {
    type: String,
    enum: ["basic", "standard", "advanced"],
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});
SubjectSchema.pre("save", function (this: ISubject) {
  this.name = `${this.className.toUpperCase()}_${this.subject.toUpperCase()}`;
});
const Subject = mongoose.model("Subject", SubjectSchema);
Subject.syncIndexes();
export { Subject };
