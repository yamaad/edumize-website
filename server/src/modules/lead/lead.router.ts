import { Router } from "express";
import LeadController from "./lead.controller";

const router = Router();

router.post("/validate-email", LeadController.emailValidator);
router.get("/all", LeadController.getAllLeads);
router.get("/download-csv", LeadController.downloadCSV);

export { router as leadRouter };
