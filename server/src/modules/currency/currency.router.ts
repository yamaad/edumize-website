import { Router } from "express";
import CurrencyController from "./currency.controller";

const router = Router();

router.get("/", CurrencyController.getCurrencyList);
router.get("/rate", CurrencyController.getCurrencyRate);

export { router as currencyRouter };
