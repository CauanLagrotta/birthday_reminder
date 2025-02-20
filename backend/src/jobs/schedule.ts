import cron from "node-cron";
import { mailTransporterService } from "../services/mail/mail_transporter.service";

// Schedule a job to run every day at 08:00 AM
cron.schedule(
  "0 8 * * *",
  async () => {
    await mailTransporterService();
    console.log("Job running at 08:00 AM");
  },
  {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  }
);
