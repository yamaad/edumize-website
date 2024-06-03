import LeadODM from "./lead.model.odm";
import { ILeadODM } from "./lead.type";

class LeadRepoODM {
  async findByEmail(email: string): Promise<ILeadODM | null> {
    return LeadODM.findOne({ email }).exec();
  }

  async createOne(lead: ILeadODM): Promise<ILeadODM> {
    return await LeadODM.create(lead);
  }

  async updateLeadEmailEntryNumber(email: string): Promise<ILeadODM | null> {
    return await LeadODM.findOneAndUpdate({ email }, { $inc: { numberOfEntry: 1 } }, { new: true });
  }
}

export default new LeadRepoODM();
