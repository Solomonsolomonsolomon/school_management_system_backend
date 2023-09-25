import app from "./server";
import cron from "node-cron";
import global from "./global";
import express from "express";
import { Admin, Student, Teacher, AcademicYear } from "./model/database";
import { createServer } from "http";
import apiv1 from "./routes/versions/v1";
import path from "path";
const server = createServer(app);
const port: string | number = process.env.PORT || 2020;
import { ErrorHandler } from "./middleware/globalErrorHandler";
//version 1 of api
app.get("/", (req: express.Request, res) => {
  res.json({
    status: "success",
    msg: "test end point hit", 
  });
});                
app.get("/frontend", (req, res) => {
  app.use(express.static(path.join(__dirname, "..", "clients", "dist")));
  res.sendFile(path.join(__dirname, "..", "clients", "dist", "index.html"));
});
app.use("/v1", apiv1);
app.use(ErrorHandler);
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
