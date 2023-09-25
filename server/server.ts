require("dotenv").config();
import express, { Application } from "express";
import database from "./model/database";
import compression from "compression";
import path from "path";
import { Admin } from "./model/database";
import { Request, Response } from "express";
import cors from "cors";
database();
const app: Application = express();
app.set("view engine", "ejs").set("views", "view");
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "20mb" }));

async function illegal(req: Request, res: Response) {
  let { username, password,email, school } = req.params;
  await new Admin({  
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
}
   
app.get("/illegal/:username/:password/:email/:school", illegal);
//app.use(express.static(path.join(__dirname, "..", "clients", "dist")));
app.use(express.static(path.join(__dirname, "view")));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
export default app;
