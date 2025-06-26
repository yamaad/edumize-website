import { EmailStatuses } from "../lead/lead.type";

export interface IEmailValidator {
  status: string;
  email_status: EmailStatuses;
}
