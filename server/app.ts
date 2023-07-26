import app from "./server";
import { Admin, Student, Teacher } from "./model/database";
import { createServer } from "http";
import { signIn } from "./controller/auth.controller";
import apiv1 from "./routes/versions/v1";
const server = createServer(app);
const port: string | number = process.env.PORT || 2020;
app.use(apiv1);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    msg: "test end point hit",
  });
});
app.get("/login");
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
