import { Router } from "express";
const v1: Router = Router();

import adminRoutes from "./../admin/admin.routes";

v1.use("/v1", adminRoutes);
export default v1;
