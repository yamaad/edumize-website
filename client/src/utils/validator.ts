import { z } from "zod";
import i18n from "i18next";

export const emailValidator = (email: string) => {
  const result = z
    .string()
    .email({ message: i18n.t("Invalid email address") })
    .safeParse(email);
  return result.success ? undefined : result.error.errors[0].message;
};
