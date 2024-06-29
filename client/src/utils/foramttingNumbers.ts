export const NumberLang = (number: number, lang: string, currency?: string): string => {
  const locale = lang === "ar" ? "ar-EG" : "en-US";

  console.log({ currency });
  if (currency) {
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
    } catch (error) {
      return `${currency} ${new Intl.NumberFormat(locale).format(number)}`;
    }
  }
  return new Intl.NumberFormat(locale).format(number);
};
