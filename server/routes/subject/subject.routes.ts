import { Router } from "express";
const router: Router = Router();
import { addSubject } from "../../controller/subject.controller";
router.post('/subject/add',addSubject)
export default router;
