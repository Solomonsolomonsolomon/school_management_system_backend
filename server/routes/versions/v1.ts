import { Router } from "express";
const v1: Router = Router();
import secured from "./../../middleware/verifyjwt";
import adminRoutes from "./../admin/admin.routes";
import authRoutes from "./../auth/auth.routes";

v1.use(authRoutes);
v1.use(secured, adminRoutes);

export default v1;
