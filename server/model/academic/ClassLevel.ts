import mongoose from "mongoose";

const { Schema } = mongoose;

const ClassLevelSchema = new Schema(
  {
    //Primary 1
    //PRY1,PRY2,PRY3,JSS1,JSS2,SSS1,SSS2,NUR1,PRE1,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    //students will be added to the class level when they are registered
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    //optional.
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema);

export { ClassLevel };
