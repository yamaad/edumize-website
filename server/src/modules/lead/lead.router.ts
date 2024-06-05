import { Router } from "express";
import LeadController from "./lead.controller";

const router = Router();

router.post("/validate-email", LeadController.emailValidator);

export { router as leadRouter };
