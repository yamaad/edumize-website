import { Request, Response, NextFunction } from "express";
import currencyService from "../../modules/currency/currency.service";

export class currencyController {
  public static getCurrencyList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currency = await currencyService.getCurrencyList();
      res.json(currency);
    } catch (error: any) {
      next(error);
    }
  };

  public static getCurrencyRate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rates = await currencyService.getCurrencyRates();
      res.json(rates);
    } catch (error: any) {
      next(error);
    }
  };
}
