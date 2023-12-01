require("dotenv").config();
import express, { Application } from "express";
import database, { Bus, School } from "./model/database";
import compression from "compression";
import path from "path";
import { Admin } from "./model/database";
import { Request, Response } from "express";
import cors from "cors";
import { CustomError } from "./middleware/decorators";
import { Subscription } from "./model/others/Subscription";
import routes from "./routes/backdoor/backdoor.routes";
database();
const app: Application = express();
app.set("view engine", "ejs").set("views", "view");
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "20mb" }));
app.use(routes);

//app.use(express.static(path.join(__dirname, "..", "clients", "dist")));
app.use(express.static(path.join(__dirname, "view")));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
export default app;

