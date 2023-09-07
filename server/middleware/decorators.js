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
exports.setErrorStatusCode = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(error, message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.CustomError = CustomError;
//decorators
function setErrorStatusCode(statusCode) {
    return function (target, key, descriptor) {
        let original = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield original.apply(this, args);
                }
                catch (error) {
                    throw new CustomError(error, error.message, statusCode);
                }
            });
        };
    };
}
exports.setErrorStatusCode = setErrorStatusCode;
