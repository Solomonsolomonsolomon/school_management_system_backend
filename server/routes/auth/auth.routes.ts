import {
  signIn,
  signOut,
  changePassword,
} from "../../controller/auth.controller";
import { Router } from "express";
import asyncErrorHandler from "../../middleware/globalErrorHandler";
const router: Router = Router();
router.post("/auth/signin", signIn);
router.get("/auth/logout/:role/:email", signOut);
router.post("/auth/password/change", asyncErrorHandler(changePassword));
export default router;
