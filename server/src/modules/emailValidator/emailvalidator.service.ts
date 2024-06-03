import { IEmailValidator } from "./emailValidator.type";

export const validateEmail = async (email: string): Promise<IEmailValidator> => {
  try {
    //TODO first use regex to reduce the api check (add the func inside the common/utils)
    const response = await fetch(`https://mailbite.io/api/check?key=${process.env.MAILBITE_KEY}&email=${email}`);
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
