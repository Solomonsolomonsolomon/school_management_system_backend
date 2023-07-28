import { signIn, signOut } from "../../controller/auth.controller";
import { Router } from "express";
const router: Router = Router();
router.post("/auth/signin", signIn);
router.get("/auth/logout/:role/:email", signOut);
export default router;
