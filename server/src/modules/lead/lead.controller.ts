import { Request, Response, NextFunction } from "express";
import leadService from "./lead.service";

class LeadController {
  public static async emailValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const lead = await leadService.validateLeadEmail(email);
      return res.status(201).json(lead);
    } catch (error: any) {
      next(error);
    }
  }
}
export default LeadController;
