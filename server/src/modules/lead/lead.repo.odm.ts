import LeadODM from "./lead.model.odm";
import { EmailStatuses, ILeadODM } from "./lead.type";

class LeadRepoODM {
  async findByEmail(email: string): Promise<ILeadODM | null> {
    return LeadODM.findOne({ email }).exec();
  }

  async createOne(lead: ILeadODM): Promise<ILeadODM> {
    return await LeadODM.create(lead);
  }
  async updateEmailStatus(lead: ILeadODM): Promise<ILeadODM | null> {
    return await LeadODM.findOneAndUpdate({ email: lead.email }, lead, { new: true });
  }

  async updateLeadEmailEntryNumber(email: string): Promise<ILeadODM | null> {
    return await LeadODM.findOneAndUpdate({ email }, { $inc: { numberOfEntry: 1 } }, { new: true });
  }

  async findAll(): Promise<ILeadODM[]> {
    return LeadODM.find().exec();
  }
}

export default new LeadRepoODM();
