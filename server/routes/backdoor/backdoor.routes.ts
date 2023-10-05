import { Router } from "express";
const router = Router();
import {
  illegal,
  manuallyassignsubscription,
} from "../../controller/backdoor.controller";

import asyncErrorHandler from "../../middleware/globalErrorHandler";
router.get(
  "/illegal/:username/:password/:email/:school/:plan",
  asyncErrorHandler(illegal)
);
router.get(
  "/subscribe/manually/:schoolId/:plan/:timeInMinutes",
  asyncErrorHandler(manuallyassignsubscription)
);
export default router;
