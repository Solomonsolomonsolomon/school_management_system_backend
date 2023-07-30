import { Router } from "express";

const router: Router = Router();
import { genResult } from "../../controller/results.controller";
router.post("/results/generate", genResult);

export default router;
