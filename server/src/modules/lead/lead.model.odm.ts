import { Schema, model } from "mongoose";
import { EmailStatuses, ILeadODM } from "./lead.type";

const leadSchema = new Schema<ILeadODM>({
  email: { type: String, required: true, unique: true },
  emailStatus: { type: String, enum: EmailStatuses, required: true },
  numberOfEntry: { type: Number, required: true },
});

const LeadODM = model<ILeadODM>("Lead", leadSchema);

export default LeadODM;
