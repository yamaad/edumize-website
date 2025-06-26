import { validateEmail } from "../emailValidator/emailvalidator.service";
import leadRepoODM from "./lead.repo.odm";
import { EmailStatuses, ILeadODM } from "./lead.type";

class LeadService {
  async validateLeadEmail(email: string): Promise<ILeadODM> {
    const existingLead = await leadRepoODM.findByEmail(email);
    if (existingLead) {
      if (existingLead.emailStatus !== EmailStatuses.ERROR && existingLead.emailStatus !== EmailStatuses.UNKNOWN)
        leadRepoODM.updateEmailStatus(existingLead);
      leadRepoODM.updateLeadEmailEntryNumber(email);
      return existingLead;
    }
    const emailValidation = await validateEmail(email);
    const newLead: ILeadODM = { email, emailStatus: emailValidation.email_status || EmailStatuses.ERROR, numberOfEntry: 1 };
    return leadRepoODM.createOne(newLead);
  }

  async getAllLeads(): Promise<ILeadODM[]> {
    return leadRepoODM.findAll();
  }
}

export default new LeadService();
