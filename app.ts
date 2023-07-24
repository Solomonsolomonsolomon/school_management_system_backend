import app from "./server";
import { createServer } from "http";
import { signIn } from "./controller/auth.controller";
const server = createServer(app);
const port: string | number = process.env.PORT || 2020;
app.use("/auth", signIn);
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
