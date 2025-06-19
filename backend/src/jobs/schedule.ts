import cron from "node-cron";
import { mailReminderTransporterService } from "../services/mail_reminder/mail_reminder_transporter.service";

// Rodando todos os dias 8 da manha
cron.schedule(
  "0 8 * * *",
  async () => {
    await mailReminderTransporterService();
    console.log("Job running at 08:00 AM");
  },
  {
    scheduled: true,
    timezone: "America/Sao_Paulo",
  }
);
