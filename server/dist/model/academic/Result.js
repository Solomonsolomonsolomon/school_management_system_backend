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
exports.Result = void 0;
const mongoose_1 = require("mongoose");
let resultSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Student",
    },
    totalScore: {
        type: Number,
    },
    position: {
        type: Number,
    },
    class: {
        type: String,
    },
    year: {
        type: String,
    },
    term: {
        type: Number,
    },
    average: {
        type: Number,
    },
    grades: [{}],
    overallGrade: {
        type: String,
    },
    status: {
        type: String,
        enum: ["failed", "passed"],
        default: "failed",
    },
});
resultSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('hitting');
        this.overallGrade == "F"
            ? (this.status = "failed")
            : (this.status = "passed");
        next();
    });
});
const Result = (0, mongoose_1.model)("Result", resultSchema);
exports.Result = Result;
