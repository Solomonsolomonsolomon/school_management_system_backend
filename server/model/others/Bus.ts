import { Schema, model, Types } from "mongoose";
import { Transaction } from "./Transacton";
import { AcademicTerm, AcademicYear, Student } from "../database";
import { schoolBus } from "./SchoolBus";
import { CustomError } from "../../middleware/decorators";

interface IBus {
  studentId: string;
  amountPaid: number;
  school: string;
  schoolId: string;
  isPaid: boolean;
}
let instance: any;

// class BusSchema {
//   constructor() {
//     if (instance) return instance;
//     instance = this;
//   }
//   public schema() {
//     return
let busSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    school: String,
    schoolId: String,
    id: {
      type: Types.ObjectId,
      ref: Student,
    },
    isPaid: {
      type: Boolean,
    },
    percentagePaid: {
      type: Number,
    },
    address: { type: String, required: true },
    balance: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);
//   }
// }
//let busSchema = new BusSchema().schema();

//handling payment
busSchema.pre("save", async function (next) {
  let currentAcademicTerm = await AcademicTerm.findOne({
    isCurrent: true,
    school: this.school,
    schoolId: this.schoolId,
  });

  let currentAcademicYear = await AcademicYear.findOne({
    isCurrent: true,
    school: this.school,
    schoolId: this.schoolId,
  });
  if (!currentAcademicTerm || !currentAcademicYear)
    throw new CustomError({}, "set academic term and or academic year", 400);
  let bus = await schoolBus.findOne({
    school: this.school,
    schoolId: this.schoolId,
  });
  if (!bus || !bus.price)
    throw new CustomError({}, "bus fees currently not set", 400);

  let student = await Student.findOne({
    school: this.school,
    schoolId: this.schoolId,
    studentId: this.studentId,
  });
  if (!student)
    throw new CustomError({}, "Oops an error occured finding student", 400);
  if (this.isDirectModified("isPaid")) {
    if (this.isPaid) {
      this.percentagePaid = 100;
      this.isPaid = true;
      this.balance = 0;
      await new Transaction({
        amountPaid: bus.price,
        status: "success",
        school: this.school,
        schoolId: this.schoolId,
        payerId: student._id,
        year: currentAcademicYear._id,
        term: currentAcademicTerm._id,
      }).save();
    } else {
      let bulkOperations: any[] = [];
      this.percentagePaid = 0;
      this.isPaid = false;

      this.balance = bus.price;
      console.log(this.balance);
      let deduct = await Transaction.find({});
      deduct.map((_) => {
        bulkOperations.push({
          updateOne: {
            filter: {
              school: this.school,
              schoolId: this.schoolId,
              payerId: student?._id,
              year: currentAcademicYear,
              term: currentAcademicTerm,
            },
            update: {
              $set: { status: "failed" },
            },
          },
        });
      });
      Transaction.bulkWrite(bulkOperations);
    }
  }
  if (this.isDirectModified("amountPaid")) {
    const total = bus.price;
    //excess balance
    // 0.0150 * this.balance + 100 ;
    if (this.amountPaid > this.balance) {
      console.log(this.balance, this.amountPaid);
      throw new CustomError(
        {},
        `Cannot deposit amount greater than bus fees balance`,
        400
      );
    } else if (this.amountPaid === this.balance) {
      this.percentagePaid = 100;
      this.isPaid = true;
      this.balance = 0;
    } else {
      console.log("3");
      this.balance = this.balance - this.amountPaid;
      let partPaid = total - this.balance;
      this.percentagePaid = ((total - this.balance) / total) * 100;
      this.isPaid = this.percentagePaid === 100;
    }
    await new Transaction({
      amountPaid: this.amountPaid,
      status: "success",
      school: this.school,
      schoolId: this.schoolId,
      payerId: student._id,
      year: currentAcademicYear,
      term: currentAcademicTerm,
    }).save();
    this.amountPaid = 0;
    next();
  }
});
//setting student details
busSchema.pre("save", async function (next) {
  console.log("hit");
  let student = await Student.findOne({
    school: this.school,
    schoolId: this.schoolId,
    studentId: this.studentId,
  });
  if (!student)
    throw new CustomError({}, "failed to save ,student details not found", 400);
  this.id = student._id;
  next();
});
let Bus = model("Bus", busSchema);
Bus.syncIndexes();
export { Bus };
