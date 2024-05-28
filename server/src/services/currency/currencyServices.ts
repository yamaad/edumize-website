import { BadRequestError } from "../../middlewares/errorhandler";
import { Currencies, Rates } from "./types";

//TODO set a proper caching
//TODO move caches into a separate folder
//-------------------------------------------
let rates: Rates | undefined;
let currencies: Currencies | undefined;
let lastSessionUpdate: number | undefined;
//-------------------------------------------

export default class CurrencyServices {
  public static getCurrencyList = async () => {
    if (currencies) return currencies;
    try {
      const response = await fetch(`https://openexchangerates.org/api/currencies.json?app_id=${process.env.OPEN_EXCHANGE_RATE_APP_ID}`);
      const data = await response.json();
      if (!response.ok) throw new BadRequestError(data.message);
      currencies = data;
      return currencies;
    } catch (error: any) {
      throw new BadRequestError(`Failed to fetch currency List: ${error.message}`);
    }
  };
  public static getCurrencyRates = async () => {
    try {
      if (this.isTimeToUpdateRates() || !rates) {
        const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATE_APP_ID}`);
        const data = await response.json();
        if (!response.ok) throw new BadRequestError(data.message);
        lastSessionUpdate = Date.now();
        const usdBasedRates = data.rates as Rates;
        // convert and return to MYR based rates
        const myrRate = usdBasedRates["MYR"];
        rates = Object.keys(usdBasedRates).reduce((acc, key) => {
          acc[key] = usdBasedRates[key] / myrRate;
          return acc;
        }, {} as Rates);
      }
      return rates;
    } catch (error: any) {
      throw new BadRequestError(`Failed to fetch currency rates: ${error.message}`);
    }
  };
  private static isTimeToUpdateRates = (): boolean => {
    if (!lastSessionUpdate) return true;
    const timeDurationInHours = 1000 * 60 * 60 * (Number(process.env.DURATION_OF_CURRENCY_RATES_UPDATES_IN_HOURS) || 4);
    const currentTime = Date.now();
    const timeDifference = currentTime - lastSessionUpdate;
    return timeDifference > timeDurationInHours;
  };
}
