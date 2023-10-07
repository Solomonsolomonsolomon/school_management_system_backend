import { Schema, model, Types } from "mongoose";
interface IschoolBus {
  studentId: string;
  amountPaid: number;
  school: string;
  schoolId: string;
  isPaid: boolean;
}
let instance: any;

class schoolBusSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public schema() {
    return new Schema(
      {
        price: Number,
        school: String,
        schoolId: String,
        noOfSeats: Number,
        noOfBuses: Number,
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "Admin",
        },
      },
      {
        timestamps: true,
      }
    );
  }
}
let schoolBus = model("schoolBus", new schoolBusSchema().schema());
schoolBus.syncIndexes();
export { schoolBus };
