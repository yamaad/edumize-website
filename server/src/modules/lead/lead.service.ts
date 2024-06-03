import { validateEmail } from "../emailValidator/emailvalidator.service";
import leadRepoODM from "./lead.repo.odm";
import { EmailStatuses, ILeadODM } from "./lead.type";

class LeadService {
  async validateLeadEmail(email: string): Promise<ILeadODM> {
    const existingLead = await leadRepoODM.findByEmail(email);
    if (existingLead) {
      leadRepoODM.updateLeadEmailEntryNumber(email);
      return existingLead;
    }
    const emailValidation = await validateEmail(email);
    const newLead: ILeadODM = { email, emailStatus: emailValidation.email_status || EmailStatuses.ERROR, numberOfEntry: 1 };
    return leadRepoODM.createOne(newLead);
  }
}

export default new LeadService();
