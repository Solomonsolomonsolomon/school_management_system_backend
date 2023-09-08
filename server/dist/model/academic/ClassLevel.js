"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassLevel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ClassLevelSchema = new Schema({
    //Primary 1
    //PRY1,PRY2,PRY3,JSS1,JSS2,SSS1,SSS2,NUR1,PRE1,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    school: {
        type: String,
        required: true,
        default: "",
    },
    plan: {
        type: String,
        enum: ["basic", "standard", "advanced"],
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const ClassLevel = mongoose_1.default.model("ClassLevel", ClassLevelSchema);
exports.ClassLevel = ClassLevel;
ClassLevel.syncIndexes();
