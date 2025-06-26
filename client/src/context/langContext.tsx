import { ReactNode, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LangContext = createContext<string>("ar");

export const LangContactProvider = ({ lang, children }: { lang: string; children: ReactNode }) => {
  const { i18n } = useTranslation();
  document.body.dir = lang === "en" ? "ltr" : "rtl";
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, []);
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};
