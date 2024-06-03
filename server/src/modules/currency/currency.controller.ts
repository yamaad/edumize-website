import { Request, Response, NextFunction } from "express";
import CurrencyServices from "./currency.service";

class CurrencyController {
  public static getCurrencyList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currency = await CurrencyServices.getCurrencyList();
      res.json(currency);
    } catch (error: any) {
      next(error);
    }
  };

  public static getCurrencyRate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rates = await CurrencyServices.getCurrencyRates();
      res.json(rates);
    } catch (error: any) {
      next(error);
    }
  };
}
export default CurrencyController;
