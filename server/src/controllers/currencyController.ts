import CurrencyServices from "@services/currency/currencyServices";
import { Request, Response, NextFunction } from "express";

export class currencyController {
  public static getCurrencyList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currency = await CurrencyServices.getCurrencyList();
      res.json({ currency });
    } catch (error: any) {
      next(error);
    }
  };

  public static getCurrencyRate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rates = await CurrencyServices.getCurrencyRates();
      res.json({ rates });
    } catch (error: any) {
      next(error);
    }
  };
}
