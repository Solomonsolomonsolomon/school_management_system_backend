import bcrypt from "bcrypt";
import mongoose, {
  Schema,
  PopulatedDoc,
  Document,
  Types,
  model,
} from "mongoose";
import { AcademicTerm } from "./AcademicTerm";
import { AcademicYear } from "./AcademicYear";
import { ISubject, Subject } from "./Subject";
import { CustomError } from "../../utils/globalErrorHandler";
import { ClassLevel } from "./ClassLevel";
import { Transaction } from "../database";

interface IStudent extends Document {
  name: string;
  email: string;
  picture?: string;
  password: string;
  studentId?: string;
  parent?: string;
  relationship?: string;
  gender: string;
  age?: string;
  role: string;
  isPaid: boolean;
  balance: number;
  amount: number;
  excess: number;
  percentagePaid: number;
  status?: string;
  school: string;
  schoolId: string;
  plan: string;
  accessToken?: string;
  classLevels?: Types.ObjectId[];
  currentClassLevel?: string;
  isPromoted?: boolean;
  currentClassArm?: string;
  academicYear?: Types.ObjectId;
  currentAcademicTerm: Types.ObjectId;
  dateAdmitted?: Date;
  examResults?: Types.ObjectId[];
  program?: Types.ObjectId;
  isGraduated?: boolean;
  isWithdrawn?: boolean;
  isSuspended?: boolean;
  prefectName?: string;
  yearGraduated?: String;
  subjects?: PopulatedDoc<ISubject & Document>;
  gradesBySubject?: any;
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
    picture: {
      type: String,
      default: "thisshouldbeabase64string",
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
    parent: {
      type: String,
    },
    relationship: {
      type: String,
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
    amount: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    percentagePaid: {
      type: Number,
    },
    balance: Number,
    excess: {
      type: Number,
      default: 0,
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
    className: {
      type: String,
    },
    school: {
      type: String,
    },
    schoolId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ["basic", "standard", "advanced"],
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
    },
    currentClassArm: {
      type: String,
      default: "A",
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
    },
    currentAcademicTerm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicTerm",
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
        ref: "Result",
      },
    ],
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
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
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    gradesBySubject: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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
//add current term and current year
studentSchema.pre("save", async function (next) {
  let school = this.school;
  let schoolId = this.schoolId;

  let currentTerm = await AcademicTerm.findOne({
    isCurrent: true,
    school,
    schoolId,
  });
  let currentYear = await AcademicYear.findOne({
    isCurrent: true,
    school,
    schoolId,
  });
  if (!currentYear || !currentTerm)
    throw new CustomError(
      {},
      "Either current year or current term not set",
      400
    );
  this.academicYear = currentYear;
  this.currentAcademicTerm = currentTerm;

  next();
});

//get back to this
// studentSchema.pre("save", async function (next) {
//   console.log("hi");
//   // let classes = [
//   //   "NUR1",
//   //   "NUR2",
//   //   "NUR3",
//   //   "PRY1",
//   //   "PRY2",
//   //   "PRY3",
//   //   "PRY4",
//   //   "PRY5",
//   //   "PRY6",
//   //   "JSS1",
//   //   "JSS2",
//   //   "JSS3",
//   //   "SS1",
//   //   "SS2",
//   //   "SS3",
//   // ];
//   // if (
//   //   this.isModified("currentClassLevel") ||
//   //   this.isModified("classLevel") ||
//   //   this.isModified("isPromoted")
//   // ) {
//   //   if (this.isPromoted) {
//   //     const currentIndex = classes.indexOf(this.currentClassLevel);
//   //     if (currentIndex !== -1 && currentIndex < classes.length - 1) {
//   //       this.currentClassLevel = classes[currentIndex + 1];
//   //     }
//   //   } else {
//   //     this.currentClassLevel;
//   //   }
//   // }
// });
// Verify Password
studentSchema.methods.verifiedPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//setting virtual className
// studentSchema.virtual("className").get(function (this: IStudent) {
//   return `${this.currentClassLevel}${this.currentClassArm}`;
// });

//currentClass
studentSchema.pre("save", async function (this: IStudent, next) {
  console.log(this.currentClassLevel);
  this.className = `${await this.currentClassLevel}${await this
    .currentClassArm}`;

  next();
});

//add subjects
studentSchema.pre("save", async function (next) {
  let school = await this.school;
  let schoolId = await this.schoolId;
  console.log(schoolId, "from school");
  let subjectsOffered: any[] = await Subject.find({
    className: this.className,
    school,
    schoolId,
  });
  this.subjects = subjectsOffered;
  next();
});
//compute balance on registration , promotion
studentSchema.pre("save", async function (next) {
  if (this.isNew || this.isDirectModified("className")) {
    console.log("className modified");
    let schoolId = await this.schoolId;
    let school = await this.school;
    let theClass: any = await ClassLevel.findOne({
      name: `${await this.currentClassLevel}${await this.currentClassArm}`,
      schoolId,
      school,
    });
    if (!theClass)
      throw new CustomError(
        {},
        "error occured fetching price.contact admin",
        400
      );
    this.percentagePaid = 0;
    this.excess = 0;
    this.isPaid = false;
    this.balance = theClass.price;
  }
  next();
});
//compute balance on fees payment
studentSchema.pre("save", async function (this: IStudent, next) {
  let classLevel = await ClassLevel.findOne({
    name: this.className,
    school: this.school,
    schoolId: this.schoolId,
  });
  if (!classLevel || !classLevel.price)
    throw new CustomError(
      {},
      "error occured fetching price.contact admin",
      400
    );
  if (this.isDirectModified("isPaid")) {
    if (this.isPaid) {
      this.percentagePaid = 100;
      this.isPaid = true;
      this.balance = 0;
      await new Transaction({
        amountPaid: classLevel.price,
        status: "success",
        school: this.school,
        schoolId: this.schoolId,
        payerId: this._id,
        year: this.academicYear,
        term: this.currentAcademicTerm,
        name: "School Fees",
      }).save();
    } else {
      let bulkOperations: any[] = [];
      this.percentagePaid = 0;
      this.isPaid = false;
      this.balance = classLevel.price;
      let deduct = await Transaction.find({});
      deduct.map((_) => {
        bulkOperations.push({
          updateOne: {
            filter: {
              school: this.school,
              schoolId: this.schoolId,
              payerId: this._id,
              year: this.academicYear,
              term: this.currentAcademicTerm,
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
  if (this.isDirectModified("amount")) {
    console.log(this.amount);

    const total = classLevel.price;
    //excess balance
    // 0.0150 * this.balance + 100 ;
    if (this.amount > this.balance) {
      throw new CustomError(
        {},
        `Cannot deposit amount greater than school fees`,
        400
      );
    } else if (this.amount === this.balance) {
      this.percentagePaid = 100;
      this.isPaid = true;
      this.balance = 0;
    } else {
      console.log("3");
      this.balance = this.balance - this.amount;
      let partPaid = total - this.balance;
      this.percentagePaid = ((total - this.balance) / total) * 100;
      this.isPaid = this.percentagePaid === 100;
    }
    await new Transaction({
      amountPaid: this.amount,
      status: "success",
      school: this.school,
      schoolId: this.schoolId,
      payerId: this._id,
      year: this.academicYear,
      term: this.currentAcademicTerm,
      name: "School Fees",
    }).save();
    this.amount = 0;
    next();
  }
});
//model
const Student = model<IStudent>("Student", studentSchema);
Student.syncIndexes();
export { Student, IStudent };
