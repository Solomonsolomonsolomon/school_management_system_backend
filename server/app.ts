import app from "./server";
import { Admin, Student, Teacher } from "./model/database";
import { createServer } from "http";
import { signIn } from "./controller/auth.controller";
const server = createServer(app);
const port: string | number = process.env.PORT || 2020;
app.use("/auth", signIn);
app.get("/", (req, res) => {
  res.render("login");
});        
app.get('/login')
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
   