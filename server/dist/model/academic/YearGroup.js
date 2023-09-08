"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const yearGroupSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    academicYear: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true,
    },
}, {
    timestamps: true,
});
//model
const YearGroup = mongoose_1.default.model("YearGroup", yearGroupSchema);
module.exports = YearGroup;
