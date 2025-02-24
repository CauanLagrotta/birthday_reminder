import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { prisma } from "../../db/database";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";

dotenv.config();

export const mailReminderTransporterService = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction:
      "Você agora é alguém que cria mensagens para pessoas que fazem aniversário hoje. Seu papel é criar uma mensagem para alguém que faz aniversário hoje. Jamais escreva qualquer insulto ou qualquer mensagem que possa fazer alguém se sentir ofendido. Lembre-se sempre de deixar as mensagens humanizadas e descontraídas. Escolha dois dos seguintes para cada mensagem e use os emojis para deixar as mensagens mais divertidas: 🎂🎁🎊✨🎉🎈🥳.",
  });

  const prompt =
    "Crie uma mensagem para alguém que faz aniversário hoje. A mensagem deve dar os parabéns e feliz aniversário à pessoa. As mensagens devem ser amigáveis, respeitosas e humanizadas. Envie diretamente as mensagens, como se alguém que você se importa muito fizesse aniversário hoje. Use no máximo dois emojis por mensagem.";

  const result = await model.generateContent(prompt);

  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    // Busca os aniversários do dia
    const birthdays = await prisma.birthdays.findMany({
      where: { day, month },
      include: { user: true },
    });

    // Agrupa os aniversários por e-mail do usuário
    const userBirthdaysMap = new Map<string, string[]>();

    birthdays.forEach(birthday => {
      const userEmail = birthday.user.email;
      if (userEmail) {
        if (userBirthdaysMap.has(userEmail)) {
          userBirthdaysMap.get(userEmail)!.push(birthday.birthday_person);
        } else {
          userBirthdaysMap.set(userEmail, [birthday.birthday_person]);
        }
      }
    });

    if (userBirthdaysMap.size > 0) {
      const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST,
        port: Number(process.env.BREVO_SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.BREVO_SMTP_USER,
          pass: process.env.BREVO_SMTP_PASS,
        },
      });

      await transporter.verify();

      // Itera sobre cada usuário e envia um e-mail personalizado
      for (const [userEmail, birthdayNames] of userBirthdaysMap) {
        // Remove nomes duplicados
        const distinctNames = [...new Set(birthdayNames)];

        const mailOptions = {
          from: "cauansilvalagrotta@gmail.com",
          to: userEmail,
          subject: "Lembrete de aniversário! 🎉🎈",
          text: "Hoje viemos lembrar alguns aniversários! 🎉🎈",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
              <h1 style="color: #333;">Hoje viemos lembrar você do aniversário de <span style="color: #28c6ea;"> ${distinctNames.join(", ")}</span>! 🥳🎁</h1>
              <img src="cid:mail_img" alt="crianças comemorando aniversário" style="max-width: 100%; height: auto; margin-bottom: 20px;">
              <h2 style="color: #555;">Não sabe o que dizer? Segue abaixo uma idéia de mensagem para você:</h2>
              <p style="margin-bottom: 10px; font-size: 16px;">${result.response.text()}</p>
            </div>
          `,
          attachments: [
            {
              filename: "mail_image.png",
              path: path.join(__dirname, "../../../assets/mail_image.png"),
              cid: "mail_img",
              contentDisposition: "inline" as "inline",
            }
          ]
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email enviado para ${userEmail}`);
      }
    } else {
      console.log("No birthdays found");
    }
  } catch (error) {
    console.log("Erro ao enviar email: ", error);
  }
};
