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
exports.Teacher = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacherSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateEmployed: {
        type: Date,
        default: Date.now,
    },
    teacherId: {
        type: String,
        required: true,
        default: function () {
            return ("TEA" +
                Math.floor(100 + Math.random() * 900) +
                Date.now().toString().slice(2, 4) +
                this.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase());
        },
    },
    formTeacher: {
        type: String,
    },
    //if withdrawn, the teacher will not be able to login
    isWithdrawn: {
        type: Boolean,
        default: false,
    },
    //if suspended, the teacher can login but cannot perform any task
    isSuspended: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "teacher",
    },
    school: {
        type: String,
    },
    plan: {
        type: String,
        enum: ["basic", "standard", "advanced"],
    },
    subjects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Subject",
            // required: true,
        },
    ],
    applicationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    program: {
        type: String,
    },
    //A teacher can teach in more than one class level
    classLevel: {
        type: String,
    },
    academicYear: {
        type: String,
    },
    examsCreated: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Exam",
        },
    ],
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
        // required: true,
    },
    academicTerm: {
        type: String,
    },
    performanceSheet: String,
}, {
    timestamps: true,
});
//Hash password
teacherSchema.pre("save", function (next) {
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
// Verify Password
teacherSchema.methods.verifiedPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
//model
const Teacher = mongoose_1.default.model("Teacher", teacherSchema);
exports.Teacher = Teacher;
Teacher.syncIndexes();
