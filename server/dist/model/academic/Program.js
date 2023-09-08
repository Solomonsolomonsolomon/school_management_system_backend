"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
        default: "6 years",
    },
    // created automatically
    //JGSPE
    code: {
        type: String,
        default: function () {
            return (this.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase() +
                Math.floor(10 + Math.random() * 90) +
                Math.floor(10 + Math.random() * 90));
        },
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    //we will push the teachers that are in charge of the program
    teachers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
            default: [],
        },
    ],
    //we will push the subjects that are in the program when the program is created
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            default: [],
        },
    ],
}, { timestamps: true });
const Program = mongoose_1.default.model("Program", ProgramSchema);
module.exports = Program;
