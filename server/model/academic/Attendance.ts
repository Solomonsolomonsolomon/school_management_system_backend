import mongoose from "mongoose";
const { Schema } = mongoose;
const attendanceSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  studentName: {
    type: String,
    default: "",
  },
  term: {
    type: Schema.Types.ObjectId,
    ref: "AcademicTerm",
    required: true,
  },
  year: {
    type: Schema.Types.ObjectId,
    ref: "AcademicYear",
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  school: String,
  schoolId: String,
  attendanceDetails: [
    {
      date: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["present", "absent", "late", "excused"],
        required: true,
      },
    },
  ],
  // Add any other fields you need here
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
