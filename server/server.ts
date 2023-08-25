require("dotenv").config();
import express, { Application } from "express";
import database from "./model/database";
import path from "path";
import cors from "cors";
database();
const app: Application = express();
app.set("view engine", "ejs").set("views", "view");
app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "..", "clients", "dist")));
app.use(express.static(path.join(__dirname, "view")));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
export default app;
    