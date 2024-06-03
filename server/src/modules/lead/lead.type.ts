export enum EmailStatuses {
  VALID = "VALID",
  INVALID = "INVALID",
  RISKY = "RISKY",
  UNKNOWN = "UNKNOWN",
  ERROR = "ERROR",
}
export interface ILeadODM {
  email: string;
  emailStatus: EmailStatuses;
  numberOfEntry: number;
}
