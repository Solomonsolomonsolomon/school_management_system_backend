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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("./../model/database");
function verifyJWT(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let authHeaders = req.headers["authorization"];
            let role = req.headers["role"];
            let Model = role == "admin"
                ? database_1.Admin
                : role == "student"
                    ? database_1.Student
                    : role == "teacher"
                        ? database_1.Teacher
                        : database_1.Admin;
            if (authHeaders) {
                let Authorization = authHeaders.split(" ");
                yield database_1.Admin.find({ academicTerms: Authorization[1].trim() }).then((e) => {
                    //  console.log("mmm", e);
                });
                let user = yield Model.findOne({ accessToken: Authorization[1] });
                if (Authorization[0].toLowerCase() === "bearer" && user) {
                    let token = Authorization[1];
                    let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
                    jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
                        if (err)
                            throw err;
                        req.user = user;
                        next();
                    });
                }
                else {
                    throw Error("add role header and set Authorizaton header- Bearer token");
                }
            }
            else {
                throw new Error("enter accessToken in an Authorization header as Bearer token");
            }
        }
        catch (error) {
            res.status(401).json({
                msg: "access token verification failed",
                status: 401,
                error,
                err: error.message,
            });
        }
    });
}
exports.default = verifyJWT;
