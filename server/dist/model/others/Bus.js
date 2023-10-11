"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const mongoose_1 = require("mongoose");
const Transacton_1 = require("./Transacton");
const database_1 = require("../database");
const SchoolBus_1 = require("./SchoolBus");
const decorators_1 = require("../../middleware/decorators");
let instance;
// class BusSchema {
//   constructor() {
//     if (instance) return instance;
//     instance = this;
//   }
//   public schema() {
//     return
let busSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
        ref: database_1.Student,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admin",
    },
}, {
    timestamps: true,
});
//   }
// }
//let busSchema = new BusSchema().schema();
//handling payment
busSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentAcademicTerm = yield database_1.AcademicTerm.findOne({
            isCurrent: true,
            school: this.school,
            schoolId: this.schoolId,
        });
        let currentAcademicYear = yield database_1.AcademicYear.findOne({
            isCurrent: true,
            school: this.school,
            schoolId: this.schoolId,
        });
        if (!currentAcademicTerm || !currentAcademicYear)
            throw new decorators_1.CustomError({}, "set academic term and or academic year", 400);
        let bus = yield SchoolBus_1.schoolBus.findOne({
            school: this.school,
            schoolId: this.schoolId,
        });
        if (!bus || !bus.price)
            throw new decorators_1.CustomError({}, "bus fees currently not set", 400);
        let student = yield database_1.Student.findOne({
            school: this.school,
            schoolId: this.schoolId,
            studentId: this.studentId,
        });
        if (!student)
            throw new decorators_1.CustomError({}, "Oops an error occured finding student", 400);
        if (this.isDirectModified("isPaid")) {
            if (this.isPaid) {
                this.percentagePaid = 100;
                this.isPaid = true;
                this.balance = 0;
                yield new Transacton_1.Transaction({
                    amountPaid: bus.price,
                    status: "success",
                    school: this.school,
                    schoolId: this.schoolId,
                    payerId: student._id,
                    year: currentAcademicYear._id,
                    term: currentAcademicTerm._id,
                    name: "Bus Fees",
                }).save();
            }
            else {
                let bulkOperations = [];
                this.percentagePaid = 0;
                this.isPaid = false;
                this.balance = bus.price;
                console.log(this.balance);
                let deduct = yield Transacton_1.Transaction.find({});
                deduct.map((_) => {
                    bulkOperations.push({
                        updateOne: {
                            filter: {
                                school: this.school,
                                schoolId: this.schoolId,
                                payerId: student === null || student === void 0 ? void 0 : student._id,
                                year: currentAcademicYear,
                                term: currentAcademicTerm,
                            },
                            update: {
                                $set: { status: "failed" },
                            },
                        },
                    });
                });
                Transacton_1.Transaction.bulkWrite(bulkOperations);
            }
        }
        if (this.isDirectModified("amountPaid")) {
            const total = bus.price;
            //excess balance
            // 0.0150 * this.balance + 100 ;
            if (this.amountPaid > this.balance) {
                console.log(this.balance, this.amountPaid);
                throw new decorators_1.CustomError({}, `Cannot deposit amount greater than bus fees balance`, 400);
            }
            else if (this.amountPaid === this.balance) {
                this.percentagePaid = 100;
                this.isPaid = true;
                this.balance = 0;
            }
            else {
                console.log("3");
                this.balance = this.balance - this.amountPaid;
                let partPaid = total - this.balance;
                this.percentagePaid = ((total - this.balance) / total) * 100;
                this.isPaid = this.percentagePaid === 100;
            }
            yield new Transacton_1.Transaction({
                amountPaid: this.amountPaid,
                status: "success",
                school: this.school,
                schoolId: this.schoolId,
                payerId: student._id,
                year: currentAcademicYear,
                term: currentAcademicTerm,
                name: "Bus Fees"
            }).save();
            this.amountPaid = 0;
            next();
        }
    });
});
//setting student details
busSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("hit");
        let student = yield database_1.Student.findOne({
            school: this.school,
            schoolId: this.schoolId,
            studentId: this.studentId,
        });
        if (!student)
            throw new decorators_1.CustomError({}, "failed to save ,student details not found", 400);
        this.id = student._id;
        next();
    });
});
let Bus = (0, mongoose_1.model)("Bus", busSchema);
exports.Bus = Bus;
Bus.syncIndexes();
