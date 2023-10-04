require("dotenv").config();
import express, { Application } from "express";
import database, { School } from "./model/database";
import compression from "compression";
import path from "path";
import { Admin } from "./model/database";
import { Request, Response } from "express";
import cors from "cors";
import { CustomError } from "./middleware/decorators";
import { Subscription } from "./model/others/Subscription";
database();
const app: Application = express();
app.set("view engine", "ejs").set("views", "view");
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "20mb" }));

async function illegal(req: Request, res: Response) {
  let { username, password, email, school, plan } = req.params;
  let schoolAlreadyExists = !!(await School.countDocuments({ school }));
  if (schoolAlreadyExists) throw new CustomError({}, "cannot reregister", 400);
  let admin = await Admin.findOne({ email, school });
  if (admin) throw new CustomError({}, "cannot reregister", 400);
  let newAdmin = new Admin({
    name: username,
    password,
    email,
    school,
  });

  let assignSubscriptionToStudents = new Subscription({
    isActive: true,
    expiresAt: Date.now() / 1000 + 300,
    plan,
    school: newAdmin.school,
    schoolId: newAdmin.schoolId,
  });

  await newAdmin.save();
  await assignSubscriptionToStudents
    .save()
    .then((e) => {
      res.json(newAdmin);
    })
    .catch((err) => {
      res.json(err);
    });
}

app.get("/illegal/:username/:password/:email/:school/:plan", illegal);

//app.use(express.static(path.join(__dirname, "..", "clients", "dist")));
app.use(express.static(path.join(__dirname, "view")));
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
export default app;
