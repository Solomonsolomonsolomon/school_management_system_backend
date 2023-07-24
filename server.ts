require("dotenv").config();
import express, { Application } from "express";
import database from "./model/database";

database();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export default app;
