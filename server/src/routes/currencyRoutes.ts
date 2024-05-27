import { Router } from "express";
import { currencyController } from "@controllers/currencyController";

const router = Router();

router.get("/", currencyController.getCurrencyList);
router.get("/rates", currencyController.getCurrencyRate);

export default router;
