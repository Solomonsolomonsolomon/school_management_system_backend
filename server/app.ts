import app from "./server";
import express from "express";
import { Admin, Student, Teacher } from "./model/database";
import { createServer } from "http";
import apiv1 from "./routes/versions/v1";
import path from "path";
const server = createServer(app);
const port: string | number = process.env.PORT || 2020;

//version 1 of api
app.get("/", (req, res) => {
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

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
