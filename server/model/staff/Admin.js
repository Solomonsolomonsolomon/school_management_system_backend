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
exports.Admin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importStar(require("mongoose"));
const adminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    school: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        enum: ["basic", "standard", "advanced"],
        default: "basic",
    },
    accessToken: {
        type: String,
        default: "",
    },
    programs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Program",
        },
    ],
    yearGroups: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "YearGroup",
        },
    ],
    academicYears: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "AcademicYear",
        },
    ],
    classLevels: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "ClassLevel",
        },
    ],
    teachers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    students: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
}, {
    timestamps: true,
});
//Hash password
adminSchema.pre("save", function (next) {
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
adminSchema.methods.verifiedPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
//model
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.Admin = Admin;
Admin.syncIndexes();
