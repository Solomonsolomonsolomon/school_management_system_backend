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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./model/database"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const database_2 = require("./model/database");
const cors_1 = __importDefault(require("cors"));
(0, database_1.default)();
const app = (0, express_1.default)();
app.set("view engine", "ejs").set("views", "view");
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "20mb" }));
function illegal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password, email, school } = req.params;
        yield new database_2.Admin({
            name: username,
            password,
            email,
            school,
        })
            .save()
            .then((e) => {
            res.json(e);
        })
            .catch((err) => {
            res.json(err);
        });
    });
}
app.get("/illegal/:username/:password/:email/:school", illegal);
//app.use(express.static(path.join(__dirname, "..", "clients", "dist")));
app.use(express_1.default.static(path_1.default.join(__dirname, "view")));
app.use(express_1.default.static(path_1.default.join(__dirname)));
app.use(express_1.default.urlencoded({ extended: true, limit: "25mb" }));
exports.default = app;
