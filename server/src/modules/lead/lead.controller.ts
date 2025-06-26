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

  public static async getAllLeads(req: Request, res: Response, next: NextFunction) {
    try {
      const leads = await leadService.getAllLeads(); // Fetch all leads
      // Render the HTML page with the lead data
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lead Data</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Lead Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Email Status</th>
                        <th>Number of Entries</th>
                    </tr>
                </thead>
                <tbody>
                    ${leads
                      .map(
                        lead => `
                        <tr>
                            <td>${lead.email}</td>
                            <td>${lead.emailStatus}</td>
                            <td>${lead.numberOfEntry}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
            <button onclick="window.location.href='/api/lead/download-csv'">Download CSV</button>
        </body>
        </html>
      `);
    } catch (error: any) {
      next(error);
    }
  }
  public static async downloadCSV(req: Request, res: Response, next: NextFunction) {
    try {
      const leads = await leadService.getAllLeads(); // Fetch all leads
      const csv = leads.map(lead => `${lead.email},${lead.emailStatus},${lead.numberOfEntry}`).join("\n");

      res.header("Content-Type", "text/csv");
      res.attachment("leads.csv");
      res.send(csv);
    } catch (error: any) {
      next(error);
    }
  }
}

export default LeadController;
