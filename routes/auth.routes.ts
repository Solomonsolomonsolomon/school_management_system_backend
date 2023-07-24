import { signIn } from "./../controller/auth.controller";
import { Router } from "express";
const router: Router = Router();
router.post('/signin',signIn)
export default router;
