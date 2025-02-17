import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { prisma } from "../../db/database";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

export const mailTransporterService = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction:
      "Você agora é alguém que cria mensagens para pessoas que fazem aniversário hoje. Seu papel é Criar mensagens amigáveis e respeitosas para pessoas que fazem aniversário hoje. Jamais escreva qualquer insulto ou qualquer mensagem que possa fazer alguém se sentir ofendido. Lembre-se sempre de deixar as mensagens humanizadas e descontraídas. Escolha dois dos seguintes emojis para deixar a mensagem mais divertida: 🎂🎁🎊✨🎉🎈🥳.",
  });

  const prompt =
    "Crie uma mensagem para alguém que faz aniversário hoje. A mensagem deve dar os parabéns à pessoa. A mensagem deve ser amigável, respeitosa e humanizada. Envie diretamente a mensagem, como se alguém que você se importa muito fizesse aniversário hoje. Use no máximo dois emojis por mensagem.";

  const result = await model.generateContent(prompt);

  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const birthdays = await prisma.birthdays.findMany({
      where: {
        day: day,
        month: month,
      },
      include: {
        user: true,
      },
    });

    if (birthdays.length > 0) {
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

      for (const birthday of birthdays) {
        if (!birthday.user.email) {
          console.log("User email not found");
          continue;
        }

        const mailOptions = {
          from: "cauansilvalagrotta@gmail.com",
          to: birthday.user.email,
          subject: "Lembrete de aniversário! 🎉🎈",
          text: `Hoje viemos lembrar você do aniversário de ${birthday.birthday_person}! 🥳🎁`,
          html: 
          `
          <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h1 style="color: #333;">Hoje viemos lembrar você do aniversário de ${birthday.birthday_person}! 🥳🎁</h1>
            <h2 style="color: #555;">Não sabe o que dizer para essa pessoa e precisa de uma idéia? Segue abaixo uma idéia que você pode enviar: </h2>
            <p style="margin-bottom: 10px; font-size: 16px;">${result.response.text()}</p>  
          </div>
          
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email enviado para ${birthday.user.email}`);
      }
    } else {
      console.log("No birthdays found");
    }
  } catch (error) {
    console.log("Erro ao enviar email: ", error);
  }
};
