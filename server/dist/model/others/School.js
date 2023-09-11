"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const themeSchema = new mongoose_1.default.Schema({
    button: String,
    headers: String,
    text: String,
});
const schoolSchema = new mongoose_1.default.Schema({
    name: String,
    schoolId: String,
    account_number: String,
    subaccount_code: String,
    themes: {
        type: themeSchema,
        default: {
            button: "",
            headers: "",
            text: "",
            saveButtons: "",
            cancelButtons: "",
        },
    },
});
const School = mongoose_1.default.model("School", schoolSchema);
exports.School = School;
School.syncIndexes();
