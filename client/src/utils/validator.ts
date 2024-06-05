import { z } from "zod";

export const emailValidator = (email: string) => {
  const result = z.string().email({ message: "Invalid email address" }).safeParse(email);
  return result.success ? undefined : result.error.errors[0].message;
};
