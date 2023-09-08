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
exports.signOut = exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("./../model/database");
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, role } = req.body;
        let roles = ["student", "admin", "teacher"];
        let index = roles.indexOf(role);
        let user = null;
        try {
            if (!email || !password || !role) {
                throw new Error("enter email and password");
            }
            let Model = index == 0 ? database_1.Student : index == 1 ? database_1.Admin : index == 2 ? database_1.Teacher : database_1.Admin;
            yield Model.findOne({ email })
                .select("name accessToken role password email _id ")
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user)
                    throw new Error("invalid credentials");
                if (yield user.verifiedPassword(password)) {
                    let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
                    let accessToken = yield jsonwebtoken_1.default.sign({ name: user.name }, ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
                    });
                    user.accessToken = accessToken;
                    yield user.save().then(() => __awaiter(this, void 0, void 0, function* () {
                        res.status(200).json({
                            msg: "successful signin",
                            accessToken,
                            accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
                            user,
                            status: 200,
                        });
                    }));
                }
                else {
                    throw new Error("invalid credentials");
                }
            }));
        }
        catch (error) {
            // Handle the error appropriately
            res.status(401).json({
                status: 401,
                error,
                err: error.message,
                msg: "signIn failed",
            });
        }
    });
}
exports.signIn = signIn;
function signOut(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { role, email } = req.params;
            if (!role || !email) {
                throw new Error("enter role and email as params like baseurl:port/v1/auth/logout/:role/:email");
            }
            let roles = ["admin", "student", "teacher"];
            let index = roles.indexOf(role.toLocaleLowerCase());
            let user = null;
            switch (index) {
                case 0:
                    user = yield database_1.Admin.findOne({ email });
                    break;
                case 1:
                    user = yield database_1.Student.findOne({ email });
                    break;
                case 2:
                    user = yield database_1.Teacher.findOne({ email });
                default:
                    break;
            }
            if (!user) {
                throw new Error("invalid user");
            }
            user.accessToken = "";
            yield user.save().then(() => {
                res.json({
                    status: 200,
                    msg: "successful logout",
                    user,
                });
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: "failed to logout",
                error,
                err: error.message,
            });
        }
    });
}
exports.signOut = signOut;
