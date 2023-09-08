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
exports.ErrorHandler = void 0;
const asyncErrorHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch((error) => next(error));
function ErrorHandler(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("hit");
        console.error(`Error occured:${err.message}`);
        res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 500).json({
            status: (err === null || err === void 0 ? void 0 : err.statusCode) || 500,
            msg: (err === null || err === void 0 ? void 0 : err.message) || "internal server error",
            error: err,
        });
    });
}
exports.ErrorHandler = ErrorHandler;
exports.default = asyncErrorHandler;
