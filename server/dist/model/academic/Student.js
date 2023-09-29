"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importStar(require("mongoose"));
const AcademicTerm_1 = require("./AcademicTerm");
const AcademicYear_1 = require("./AcademicYear");
const Subject_1 = require("./Subject");
const decorators_1 = require("../../middleware/decorators");
const ClassLevel_1 = require("./ClassLevel");
const database_1 = require("../database");
const studentSchema = new mongoose_1.default.Schema({
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
        default: function () {
            return ("STU" +
                Math.floor(100 + Math.random() * 900) +
                Date.now().toString().slice(2, 4) +
                this.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase());
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
            type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicYear",
    },
    currentAcademicTerm: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Result",
        },
    ],
    program: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    gradesBySubject: {
        type: mongoose_1.default.Schema.Types.Mixed,
        default: {},
    },
}, {
    timestamps: true,
});
//Hash password
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        //Salt
        const salt = yield bcrypt_1.default.genSalt(10);
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
//add current term and current year
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let school = this.school;
        let schoolId = this.schoolId;
        let currentTerm = yield AcademicTerm_1.AcademicTerm.findOne({
            isCurrent: true,
            school,
            schoolId,
        });
        let currentYear = yield AcademicYear_1.AcademicYear.findOne({
            isCurrent: true,
            school,
            schoolId,
        });
        if (!currentYear || !currentTerm)
            throw new decorators_1.CustomError({}, "Either current year or current term not set", 400);
        this.academicYear = currentYear;
        this.currentAcademicTerm = currentTerm;
        next();
    });
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
studentSchema.methods.verifiedPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
//setting virtual className
// studentSchema.virtual("className").get(function (this: IStudent) {
//   return `${this.currentClassLevel}${this.currentClassArm}`;
// });
//currentClass
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(this.currentClassLevel);
        this.className = `${yield this.currentClassLevel}${yield this
            .currentClassArm}`;
        next();
    });
});
//add subjects
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let school = yield this.school;
        let schoolId = yield this.schoolId;
        console.log(schoolId, "from school");
        let subjectsOffered = yield Subject_1.Subject.find({
            className: this.className,
            school,
            schoolId,
        });
        this.subjects = subjectsOffered;
        next();
    });
});
//compute balance on registration , promotion
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isDirectModified("className")) {
            console.log("className modified");
            let schoolId = yield this.schoolId;
            let school = yield this.school;
            let theClass = yield ClassLevel_1.ClassLevel.findOne({
                name: `${yield this.currentClassLevel}${yield this.currentClassArm}`,
                schoolId,
                school,
            });
            if (!theClass)
                throw new decorators_1.CustomError({}, "error occured fetching price.contact admin", 400);
            this.percentagePaid = 0;
            this.excess = 0;
            this.isPaid = false;
            this.balance = theClass.price;
        }
        next();
    });
});
//compute balance on fees payment
studentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let classLevel = yield ClassLevel_1.ClassLevel.findOne({
            name: this.className,
            school: this.school,
            schoolId: this.schoolId,
        });
        if (!classLevel || !classLevel.price)
            throw new decorators_1.CustomError({}, "error occured fetching price.contact admin", 400);
        if (this.isDirectModified("isPaid")) {
            if (this.isPaid) {
                this.percentagePaid = 100;
                this.isPaid = true;
                this.balance = 0;
                yield new database_1.Transaction({
                    amountPaid: classLevel.price,
                    status: "success",
                    school: this.school,
                    schoolId: this.schoolId,
                    payerId: this._id,
                    year: this.academicYear,
                    term: this.currentAcademicTerm,
                }).save();
            }
            else {
                let bulkOperations = [];
                this.percentagePaid = 0;
                this.isPaid = false;
                this.balance = classLevel.price;
                let deduct = yield database_1.Transaction.find({});
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
                database_1.Transaction.bulkWrite(bulkOperations);
            }
        }
        if (this.isDirectModified("amount")) {
            console.log("1");
            console.log(this.amount);
            const total = classLevel.price;
            //excess balance
            if (this.amount > this.balance) {
                throw new decorators_1.CustomError({}, `Cannot deposit amount greater than school fees`, 400);
            }
            else if (this.amount === this.balance) {
                this.percentagePaid = 100;
                this.isPaid = true;
                this.balance = 0;
            }
            else {
                console.log("3");
                this.balance = this.balance - this.amount;
                let partPaid = total - this.balance;
                this.percentagePaid = ((total - this.balance) / total) * 100;
                this.isPaid = this.percentagePaid === 100;
            }
            yield new database_1.Transaction({
                amountPaid: this.amount,
                status: "success",
                school: this.school,
                schoolId: this.schoolId,
                payerId: this._id,
                year: this.academicYear,
                term: this.currentAcademicTerm,
            }).save();
            this.amount = 0;
            next();
        }
    });
});
//model
const Student = (0, mongoose_1.model)("Student", studentSchema);
exports.Student = Student;
Student.syncIndexes();
