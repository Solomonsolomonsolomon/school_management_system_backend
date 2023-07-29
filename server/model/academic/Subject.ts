import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

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
// );
const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: Types.ObjectId,
    ref: "Teacher",
  },
  academicYear: {
    type: "string",
    default: () => {
      let date = new Date();
      //september begins new academic year
      date.getMonth() < 8
        ? `${date.getFullYear() - 1}/${date.getFullYear()}`
        : `${date.getFullYear()}/${date.getFullYear() + 1}`;
    },
  },
  className: {
    type: String,
  },
});
const Subject = mongoose.model("Subject", subjectSchema);

export { Subject };
